---
title: Entity의 다양한 연관관계 맵핑
date: 2020-04-25 15:04:13
category: jpa
---

## Intro

이전에 [Entity Mapping](https://changrea.io/jpa/entity-mapping/)에 대해 정리했었다. 간단하게 Entity와 Table을 맵핑하는 방법에 대해서만 정리했었는데, 데이터베이스 개념적 모델링에 대해 들어봤다면, `1:1`, `1:N`, `N:M` ... 여러 테이블 간 관계에 대해서 다뤄봤을 것이다.

이번 포스팅에서 이런 연관관계에 대해서 JPA에서는 어떻게 처리하는지에 대해 정리할 것이다.

## 다대일 (N:1)

### 다대일 단방향

#### 회원 엔티티(N)

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  
  private String username;
  
  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team;
  
  // Getter, Setter ...
  ...
}
```

#### 팀 엔티티(1)

```java
@Entity
public class Team {
	
  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;
  
  private String name;
  
  // Getter, Setter ...
  ...
}
```

- 회원(Member) 엔티티에서 팀(Team) 엔티티 참조 가능
  - `@ManyToOne`
- `@JoinColumn`
  - 'TEAM_ID' 라는 외래 키와 매핑

### 다대일 양방향 (N:1, 1:N)

#### 회원 엔티티

```java
@Entity
public class Member {
  
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;
  
  private String username;
  
  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team;
  
  public void setTeam(Team team) {
    this.team = team;
    
    //무한루프에 빠지지 않도록 체크
    if(!team.getMembers().contains(this)) {
      team.getMembers().add(this);
    }
  }
}
```

#### 팀 엔티티

```java
@Entity
public class Team {
	
  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;
  
  private String name;
  
  @OneToMany(mappedBy = "team")
  private List<Member> members = new ArrayList<Member>();
  
  public voide addMember(Member member) {
    this.members.add(member);
    if (member.getTeam() != this) {	//무한루프에 빠지지 않도록 체크
      member.setTeam(this);
    }
  }
}
```



## 일대다 (1:N)

## 일대일 (1:1)

## 다대다 (N:M)

