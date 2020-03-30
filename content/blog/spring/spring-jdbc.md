---
title: Spring JDBC와 트랜잭션 관리
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