---
title: Spring Security Authentication(인증) - DB, Password, Logout
date: 2020-05-28 23:06:39
category: spring
---

## 인증 처리

### 데이터베이스 인증

<img src="./img/spring-security-db-auth.png" />

1. 스프링 시큐리티는 클라이언트로부터 인증 의뢰를 받아 DaoAuthenticationProvider에 인증 처리를 위임한다.
2. DaoAuthenticationProvider는 UserDetailsService에게 사용자 정보를 가져오게 한다.
3. UserDetailsService 구현 클래스는 데이터 저장소에서 사용자 정보를 가져온다.
4. UserDetailsService 구현 클래스는 데이터 저장소에서 가져온 사용자 정보를 사용해 UserDetails를 만든다.
5. DaoAuthenticationProvider는 UserDetailsService에서 반환된 UserDetails와 클라이언트가 제공한 인증 정보를 대조해서 이요자가 정당한 사용 권한을 가지고 잇는지 확인



#### UserDetails 작성

UserDetails는 인증 처리에 필요한 자격정보(사용자명과 패스워드)와  사용자의 상태 정보를 제공하기 위한 인터페이스로서 다음과 같은 메서드가 정으돼 있다.

<br />

> UserDetails 인터페이스

```java
public interface UserDetails extends Serializable {
  String getUsername();	// 사용자명 반환
  String getPassword();	// 등록된 패스워드 반환(패스워드 틀리면 BadCredentialsException 발생)
  boolean isEnabled();	// 유효한 패스워드인지 판단
  boolean isAccountNonLocked();	// 계정의 잠금 상태를 판단
  boolean isAccountNonExpired();	// 계정의 유효 기간 상태를 판단
  boolean isCredentialsNonExpired();	// 자격정보의 유효 기간 상태를 판단
  Collection<? extends GrantedAuthority> getAuthorities();	// 사용자가 가진 권한 리스트 반환 (인가 처리를 할 때 필요)
}
```

<br />

> UserDetails 인터페이스를 구현한 예

```java
public class AccountUserDetails implements UserDetails {
  
  private final Account account;
  private final Collection<GrantedAuthority> authorities;
  
  public AccountUserDetails(
  	Account account, Collection<GrantedAuthority> authorities) {
    this.account = acount;
    this.authorities = authorities;
  }
  
  public String getPassword() {
    return account.getPassword();
  }
  public String getUsername() {
    return account.getUsername();
  }
  public boolean isEnabled() {
    return account.isEnabled();
  }
  public Collection<GrantedAuthority> getAuthorities() {
    return authorities;
  }
  ...
  
  // 인증에 성공한 이후의 처리 과정에서 활용할 수 있도록 접근 메소드 제공
  public Account getAccount() {
    return account;
  }
}
```



스프링 시큐리티는 UserDetails의 구현 클래스로 User 클래스를 제공한다.

```java
public class AccountDetails extends User {
  
  private final Account account;
  
  public AccountUserDetails(Account account, boolean accountNonExpired,
                           boolean credentialsNonExpired, boolean accountNonLocked,
                           Collection<GrantedAuthority> authorities) {
    super(account.getUsername(), account.getPassword(), account.isEnabled(),
         true, true, true, authorities);
    this.account = account;
  }
  
  public Account getAccount() {
    return account;
  }
}
```



#### UserDetailsService 작성

- 자격정보와 사용자 상태 정보를 데이터 저장소에서 가져오기 위한 인터페이스

<br />

> UserDetailsService 인터페이스

```java
public interface UserDetailsService {
  UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```

<br />

> UserDetailsService 인터페이스를 구현한 예

```java
@Service
public class AccountUserDetailsService implements UserDetailsService {
  @Autowired
  AccountRepository accountRepository;
  
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String username)
    			throws UsernameNotFoundException {
    Account account = Optional
      				.ofNullable(accountRepository.findOne(username))
      				.orElseThrow(() -> new UsernameNotFoundException("user not found."));
    return new AccountUserDetails(account, getAuthorities(account));
  }
  
  
  private Collection<GrantedAuthority> getAuthorities(Account account) {
    if(account.isAdmin()) {
      return AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_USER",
                                               "ROLE_ADMIN");
    } else {
      return AuthorityUtils.createAuthorityList("ROLE_USER");
    }
  }
}
```

:exclamation: 참고로 스프링 시큐리티에서 인가 처리를 할 때는 **'ROLE_'**로 시작하는 권한 정보를 롤로 취급한다.



#### 인증 처리 적용

- 앞서 만든 UserDetailsService를 사용해 사용자 인증 처리를 하려면AuthenticationManagerBuilder에 UserDetailsService를 적용해야 한다.

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  
  @Autowired
  UserDetailsService userDetailsService;
  
  @Autowired
  void configureAuthenticationManager(AuthenticationManagerBuilder auth)
    throws Exception {
    auth.userDetailsService(userDetailsService)
      .passwordEncoder(passwordEncoder());
  }
  
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
```

