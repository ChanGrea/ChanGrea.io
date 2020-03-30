---
title: Spring JDBC
date: 2020-03-30 22:03:50
category: spring
---

## 데이터 소스

애플리케이션이 **데이터베이스에 접근**하기 위한 추상화된 연결 방식, 즉 **커넥션을 제공**하는 역할을 하는 것이 데이터 소스다.

스프링 프레임워크가 제공하는 데이터 소스에는 크게 세 가지 방법이 있다.

1. **애플리케이션 모듈**이 제공하는 데이터 소스
   - Commons DBCP, Tomcat JDBC Connection Pool과 같은 서드파티가 제공하는 데이터 소스
   - DriverManagerDataSource 같이 스프링 프레임워크가 테스트 용도로 제공하는 데이터 소스
   - DB 접속을 위한 사용자 ID와 PW, URL같은 정보를 **애플리케이션**이 직접 관리
2. 애플리케이션 **서버**가 제공하는 데이터 소스
   - 서버가 정의한 데이터 소스를 JNDI(Java Naming and Directory Interface)를 통해 가져와서 사용
   - DB 접속 정보를 **서버**에서 관리
3. **내장형 데이터베이스**를 사용하는 데이터 소스
   - HSQLDB, H2, Apache Derby 같은 내장형 데이터베이스에 접속하는 데이터 소스
   - 애플리케이션 개발 전 프로토타입을 만들거나 비업무적인 지원 툴, 관리 툴 개발 시 활용

### 데이터 소스 설정

> 참고로 XML 방식도 있지만, 앞으로는 자바 기반 방식으로 정리하려고 한다.

#### pom.xml 설정

```xml
<dependency>
	<groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
</dependency>
```

#### :strawberry: 애플리케이션 모듈이 제공하는 데이터 소스

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
public class PoolingDataSourceConfig {
  @Bean(destroyMethod = "close")
  public DataSource dataSource {
    @Value("${database.driverClassName}") String driverClassName,
    @Value("${database.url}") String url,
    @Value("${database.username}") String username,
    // ... 생략
    BasicDataSource dataSource = new BasicDataSource();
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUrl(url);
    dataSource.setUsername(username);
    // ... 생략
    return dataSource;
  }
}
```

- 아래 프로퍼티 파일에서 읽어 `BasicDataSource`에 셋팅하여 리턴한다.

> jdbc.properties 프로퍼티 파일

```properties
database.url=jdbc:postgresql://localhost/sample
database.username=postgres
database.password=postgres
database.driverClassName=org.postgresql.Driver
cp.maxTotal=96
cp.maxIdle=16
cp.minIdle=0
cp.maxWaitMillis=60000
```



#### :strawberry: 애플리케이션 서버가 제공하는 데이터 소스

- 'jdbc/mydb'라는 JNDI명으로 커넥션 풀이 만들어져 있다고 가정

```java
@Configuration
public class JndiDatasourceConfig {
  @Bean
  public DataSource dataSource() {
    JndiTemplate jndiTemplate = new JndiTemplate();
    return JndiTemplate.lookup("java:comp/env/jdbc/mydb", DataSource.class);
  }
}
```



#### :strawberry: 내장형 데이터베이스를 사용하는 데이터 소스

- 애플리케이션을 기동할 때마다 데이터베이스가 새로 구축되기 때문에 아래 것들이 필요
  - 테이블과 같은 기본 구조를 만들기 위한 **DDL**(Data Definition Language)
  - 초기 데이터를 적재하기 위한 **DML**(Data Manipulation Language)

```java
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatasourceEmbeddedConfig {
  @Bean
  public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder()
      .setType(EmbeddedDatabaseType.H2)
      .setScriptEncoding("UTF-8")
      .addScripts("META-INF/sql/schema.sql", "META_INF/sql/insert-init-data.sql")
      .build();
  }
}
```

- H2 사용
- `schema.sql` 과 `insert-init-data.sql` 을 각각 DDL, DML로 사용



## 스프링 JDBC

### 개요

`공통적이면서 반복적으로 수행하는 JDBC 처리`를 스프링이 대신해준다. 

- 커넥션의 연결과 종료
- SQL 문의 실행
- SQL 문 실행 결과 행에 대한 반복 처리
- 예외 처리

`개발자가 할 일`은 아래와 같다.

- SQL문 정의
- 파라미터 설정
- ResultSet에서 결과를 가져온 후, 각 레코드별로 필요한 처리

### JdbcTemplate 클래스를 활용한 CRUD

- **JdbcTemplate** (org.springframework.jdbc.core.JdbcTemplate)
- **NamedParameterJdbcTemplate** (org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate)

스프링에서 SQL을 가지고 데이터베이스를 다루는 클래스는 위 두 가지를 제공하고 있다.

둘의 차이는 데이터 바인딩 시 `?` 문자를 플레이스홀더로 사용하느냐 아니면 `파라미터 이름` 을 사용하느냐의 차이다.

#### JdbcTemplate클래스가 제공하는 주요 메서드

| 메서드명       | 설명                                                         |
| -------------- | ------------------------------------------------------------ |
| queryForObject | 하나의 결과 레코드 중에서 하나의 칼럼 값을 가져올 때 사용    |
| queryForMap    | 하나의 결과 레코드 정보를 `Map` 형태로 매핑                  |
| queryForList   | 여러 개의 결과 레코드를 다룬다.                              |
| query          | ResultSetExtractor, RowCallbackHandler와 함께 조회할 때 사용 |
| update         | 데이터를 변경하는 SQL(INSERT, DELETE, UPDATE)을 실행할 때 사용 |

#### JdbcTemplate Example

앞서 언급했던 **JdbcTemplate**과 **NamedParameterJdbcTemplate**에 대해 어떻게 쓰는지 잠깐 정리해보려고 한다.

참고로 JdbcTemplate은 @Autowired로 주입받아서 사용한다.

> JdbcTemplate을 이용한 데이터 조회 예제

```java
public String findRoomNameById(String roomId) {
  String sql = "SELECT room_name FROM room WHERE room_id = ?";
  return jdbcTemplate.queryForObject(sql, String.class, roomId);
  /*
  파라미터를 배열로 전달할 때는 다음과 같은 방법을 쓴다.
  Object[] args = new Object[] {roomId};
  return jdbcTemplate.queryForObject(sql, args, String.class);
  */
}
```



> NamedParameterJdbcTemplate을 이용한 예제

```java
@Component
public class JdbcRoomNameDao {
  @Autowired
  NamedParameterJdbcTemplate namedParameterJdbcTemplate;
  
  public String findRoomNameById(String roomId) {
    String sql = "SELECT room_name FROM room WHERE room_id = :roomID";
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("roomId", roomId);
    return namedParameterJdbcTemplate
      .queryForObject(sql, params, String.class);
  }
}
```



#### SqplParameterSource를 활용한 파라미터 설정

위에서는 파라미터를 설정하기 위해 `Map` 을 사용했다. 좀 더 쉽게 파라미터를 설정할 수 있는 방법이 있다고 한다.(~~사실 그게 그거인 것 같다.~~)

1. org.springframework.jdbc.core.namedparam.**MapSqlParameterSource**

   ```java
   MapSqlParameterSource map = new MapSqlParameterSource()
     .addValue("roomId", "A001").addValue("roomName", "임원 회의실")
     .addValue("capacity", 10);
   ```

   

2. org.springframework.jdbc.core.namedparam.**BeanPropertySqlParameterSource**

   ```java
   Room room = new Room("A001", "임원 회의실", 10);
   BeanPropertySqlParameterSource map = new BeanPropertysqlParameterSource(room);
   ```

   

### SQL 질의 결과를 POJO로 변환

스프링 JDBC는 처리 결과값을 자바가 기본적으로 제공하는 데이터 타입이나 Map, List 같은 컬렉션 타입으로 반환한다.

보통 애플리케이션을 개발할 때 해당 비즈니스에 맞는 데이터 타입을 POJO 형태로 만들어 쓰는 경향이 있기 때문에 데이터를 가공해야 한다.

이에 원하는 형태로 변환하기 쉽도록 세 가지 인터페이스를 제공한다.

#### RowMapper

- ResultSet을 순차적으로 읽으면서 원하는 POJO 형태로 매핑할 때 사용
- ResultSetExtractor와의 차이점은 ResultSet의 한 행이 하나의 POJO 객체로 변환되고, ResultSet이 다음 행으로 넘어가는 커서 제어를 스프링 프레임워크가 대신 해준다는 점이다.

```java
public class RoomRowMapper implements RowMapper<Room> {
  @Override
  public Room mapRow(ResultSet rs, int rowNum) throws SQLException {
    Room room - new Room();
    room.setRoomId(rs.getString("room_id"));
    room.setRoomName(rs.getString("room_name"));
    room.setCapacity(rs.getInt("capacity"));
    return room;
  }
}
```



#### ResultSetExtractor

- ResultSet을 자유롭게 제어하면서 원하는 POJO 형태로 매핑하고 싶을 때 사용
- RowMapper와의 차이점은 ResultSet의 여러 행 사이를 자유롭게 이동할 수 있다는 점

```java
public class RoomListResultSetExtractor implements ResultSetExtractor<List<Room>> {
  
  @Override
  public List<Room> extractData(ResultSet rs) 
    throws SQLException, DataAccessException {
    Map<String, Room> map = new LinkedHashMap<String, Room>();
    Room room = null;
    while (rs.next()) {
      String roomId = rs.getString("room_id");
      room = map.get(roomId);
      if (room == null) {
        room = new Room();
        room.setRoomId(roomId);
        room.setRoomName(rs.getString("room_name"));
        room.setCapacity(rs.getInt("capacity"));
        map.put(roomId, room);
      }
      String equipmentId = rs.getString("equipment_id");
      if ( equipmentId != null) {
        Equipment equipment = new Equipment();
        equipment.setEquipmentId(equipmentId);
        equipment.setRoomId(roomId);
        equipment.setEquipmentName(rs.getString("equipment_name"));
        equipment.setEquipmentCount(rs.getInt("equipment_count"));
        equipment.setEquipmentRemarks(rs.getString("equipment_remarks"));
        room.getEquipmentList().add(equipment);
      }
    }
    if (map.size() == 0) {
      throw new EmptyResultDataAccessException(1);
    }
    return new ArrayList<Room>(map.values());
  }
}
```



#### RowCallbackHandler

- 앞선 두 방법과 달리 **반환값이 없다.**
- 결과를 반환하기 위해 사용하는 것이 아니라 별도의 다른 처리를 하고 싶을 때 사용
- 파일 형태로 출력 or 조회된 데이터 검증

```java
public class RoomRowCallbackHandler implements RowCallbackHandler {
  @Override
  public void processRow(ResultSet rs) throws SQLException {
    try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
    	new FileOutputStream(File.createTempFile("room_", ".csv")), "UTF-8"))) {
      while (rs.next()) {
        Object[] array = new Object[] {
          rs.getString("room_id"),
          rs.getString("room_name"),
          rs.getInt("capacity") };
        String reportRow = StringUtils.arrayToCommaDelimitedString(array);
        writer.write(reportRow);
        writer.newLine();
      }
    } catch (IOException e) {
      throw new SQLException(e);
    }
  }
}
```

