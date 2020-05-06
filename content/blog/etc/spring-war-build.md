---
title: Spring Boot 단독으로 실행 가능한 war 파일 빌드
date: 2020-05-06 22:05:41
category: etc
---

## Intro

1차적으로 개발을 완료하고 Spring Boot 어플리케이션을 빌드하여 배포를 진행하고 있다. 우선 배포를 하기 전, 로컬에서 빌드해서 실행해보고 배포를 하기로 했다.

빌드 환경은 아래와 같다.

- Maven 3.6.3
- JDK 1.8
- Spring Boot 2.0 



## :question: 문제

war 파일로 빌드는 되었으나, 실행이 되지 않았다. 즉 실행 가능한 파일로 빌드되지 않았다는 뜻이다.



### 초기 pom.xml과 실행 결과

#### pom.xml

```xml
<build>

    <finalName>ROOT</finalName>
    <directory>target</directory>
    <sourceDirectory>${basedir}/src/main/java</sourceDirectory>

    <resources>
        <resource>
            <directory>${basedir}/src/main/resources</directory>
        </resource>
    </resources>

    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>2.6</version>
            <configuration>
                <failOnMissingWebXml>false</failOnMissingWebXml>
            </configuration>
        </plugin>
    </plugins>
</build>
```

#### 실행 결과

```bash
java -jar ROOT.war
```

> ~.war에 기본 Manifest 속성이 없습니다.



## :white_check_mark: 해결방법

### maven plugin executions 옵션 추가

```xml
<executions>
    <execution>
        <goals>
            <goal>repackage</goal>
        </goals>
    </execution>
</executions>
```



### pom.xml 전체 build 부분

```xml
<build>

    <finalName>ROOT</finalName>
    <directory>target</directory>
    <sourceDirectory>${basedir}/src/main/java</sourceDirectory>

    <resources>
        <resource>
            <directory>${basedir}/src/main/resources</directory>
        </resource>
    </resources>
    
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>1.2.3.RELEASE</version>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>2.6</version>
            <configuration>
                <failOnMissingWebXml>false</failOnMissingWebXml>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### :exclamation: 참고

참고로 해당 프로젝트에는 main function이 두 곳에 존재 했다. 그렇기 때문에 빌드 할 때 main을 하나만 지정하라는 에러가 발생했었다. 그래서 사용하지 않는(?) main function을 disable하여  해결







[https://stackoverflow.com/questions/40289437/how-to-create-a-single-executable-war-in-spring-boot](https://stackoverflow.com/questions/40289437/how-to-create-a-single-executable-war-in-spring-boot)

