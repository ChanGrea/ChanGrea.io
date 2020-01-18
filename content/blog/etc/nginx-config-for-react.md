---
title: Nginx에 React App 배포 경험 (feat. CI/CD)
date: 2020-01-12 20:01:83
category: etc
---

**Nginx**는 Apache Tomcat과 같은 웹 서버 소프트웨어라고 한다. (사실 이 전에는 Nginx가 물리적인 서버 자체 종류인 줄 알았다..:sweat:)

이번에 회사에서 내가 만든 React App을 TB 환경의 서버에 배포(정확히 말하자면 CI/CD까지..!:sunglasses:)하는 업무를 했었다.

그 중에 배포를 하면서 <u>삽질한 과정</u>에 대해서 정리하고자 한다.

아래는 그 **삽질한 내용**이다.

- 결과물 Version 관리에 대한 고민
- Nginx 설정
- 추가적인 React 설정

## React App Build

### :heavy_check_mark: 프로젝트 생성

처음에 프로젝트를 시작할 때, `Create-React-App(CRA)`으로 시작했었다.

```bash
$ npx create-react-app myapp
```

### :heavy_check_mark: 빌드

위와 같이 만들고 나면 기본적으로 `package.json`의 명령어 script 목록에 `build` 명령어가 있을 것이다.

하지만 나의 경우에는 **절대 경로**를 사용하기 위해 `cross-env`를 사용했고, 아래와 같이 수정했다.

```json
"scripts": {
    "start": "cross-env NODE_PATH=src react-scripts start",
    "build": "cross-env NODE_PATH=src react-scripts build",
    ...
},
```

```bash
$ yarn build //(or) npm run build
```

위 명령어로 빌드하게 되면 project 폴더 하위에 `build 폴더`가 생성된다.

### :heavy_check_mark: CD(Continuous Deployment)를 위한 Zipping

> :raised_hand: 왜 CI가 빠져있죠?

라고 생각하는 사람이 있을 것이다.

CI/CD를 위해 우리는 Jenkins를 사용하고 있다. 하지만 아직 사내 Jenkins에서 npm 빌드 지원을 적용 중에 있기 때문에 CI는 할 수 없었다. :disappointed_relieved:

:exclamation:그래서 CI 과정을 `빌드-압축-업로드` 과정으로 대체하였다.

#### > <i>빌드</i>

빌드 과정은 위 `package.json`의 `build`를 참고

#### > <i>압축</i>

**build 폴더 압축**을 위해 [bestzip](https://www.npmjs.com/package/bestzip)를 이용하였다.

```bash
$ npm install --save-dev bestzip
```

이후 build 폴더를 배포할 것이기 때문에 build 폴더를 압축한다.

```json
"scripts": {
    ...
    "zip": "bestzip bundle.zip build/*",
},
```

#### > <i>업로드</i>

마지막으로 압축 결과물을 Git에 업로드 할 것이다. 사실 이 과정은 **빌드**와 **압축**을 그냥 한 줄로 모아둔 것이다.

```json
"scripts": {
    ...
    "deploy": "yarn build && yarn zip",
},
```

### :heavy_check_mark: Version 관리에 대한 고민..

실제 중요한 것은 이 결과물에 대한 <u>**Version 관리**에 대한 정책</u>이었다.

CI가 되었다면 Jenkins를 통해 Version 관리를 할 수 있었겠지만, 나는 Version 관리를 `Git`을 통해서 이용하기로 결정했다.

이 프로젝트는 `Git flow` 전략을 통해 branch 관리를 하고 있다. 어차피 release branch를 통해 배포 주기가 시작되고 완료 후에는 master branch로 merge 된다.(build폴더를 압축한 zip 파일이 git에 올라간다고 하였다.)

그 후에 master branch에 version명으로 태그를 다는 형식으로 zip 파일을 관리한다.

물론 CD를 통해 Git에서 Jenkins로 가져와 workspace를 구성하지만, Git이 Jenkins보다는 내부적으로 오래 사용해왔고 (그렇지는 않겠지만..)없어질 위험도 보다 적을 것이라 생각했다.

## Jenkins CD 설정

위 빌드한 결과물을 Git(Gitlab)에 업로드까지 완료하였다. 그렇다면 Gitlab에 올린 파일을 어떻게 Jenkins에 가져와서 서버에 업로드할까?

다행히 Gitlab에서는 Repository의 파일에 접근할 수 있는 API를 제공하고 있었다.

[https://docs.gitlab.com/ee/api/repository_files.html](https://docs.gitlab.com/ee/api/repository_files.html)

> API 문서의 다른 부분을 읽다보면 CI도 제공하는 것을 봤을 수도 있다. 왜 이용하지 않았냐 궁금할 수도 있는데, 실제 회사에서는 라이센스나 보안, 방화벽 등 제약사항이 많기 때문에 달리 방법이 없었다.

자세한 스크립트 내용은 공개하기 어렵다. 과정은 아래와 같다.

1. 위 API를 통해(물론 Token은 각자 알아서 생성해야 함) Jenkins에 파일을 다운로드 한다.
2. Jenkins에 가져오면, 이것을 다시 배포하고자 하는 서버에 옮겨야 한다. (`ssh`와 `scp` 이용)
3. 서버에 옮긴 zip 파일을 unzip한다.

## Nginx 설정

이 전까지는 무난했다. Jenkins도 처음 다뤄보긴 했지만, 기존에 다른 프로젝트에 적용된 스크립트 파일이 있어서 참고해서 했기 때문에 무리가 없었다.

하지만 **Nginx**라는 것도 들어보기만 했지 실제 다뤄보는 것은 처음이었다. 서버에 접속해서 여기저기 뒤져본 것도 처음이었다.. 보통 하나의 서버에 하나의 서비스만 돌아가지는 않더라.. 여러가지 서비스가 있었고, 하나의 서비스를 더 추가하는 식으로 진행했다.

내가 배포하려는 서버에는 이미 Nginx가 설치되어 있었다.(때문에 설치 과정은 생략한다.)

### 설정 파일

설치를 하면 보통 설정 파일은 **/etc/nginx/sites-available/에 .conf 형식의 파일**에 두고 심볼릭 링크를 걸어주는 식으로 설정을 한다.

하지만 **URL 설정**을 위해서 설정 파일을 찾았지만, /etc 자체에 nginx가 없었다.

```bash
$ find / -name nginx.conf
```

내가 접속한 서버의 경우에는 **/app/nginx/conf/nginx.conf** 에 있었다.

```bash
$ vi /app/nginx/conf/nginx.conf
```

설정 파일을 열어보면 아래와 같은 부분이 있다. (이 부분의 `location` block을 수정)

> nginx.conf

```
http {
    include       mime.types;
    server {
        listen       80;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
}
```

내가 이해한 부분을 중심으로 정리하자면,

- `location`은 **요청이 들어오는 URL Path**다.
- `root`는 location으로 넘어온 부분을 `root`를 베이스로 찾는다. (root 경로 뒤에 location이 붙는다.)

  > :exclamation: 여기서 `root`와 `alias`의 차이(정확히는 <u>존재</u>)를 몰라서 헤맸었다.
  > <br/> `root`: 위에서 설명했듯이, location으로 넘어온 부분을 베이스로 찾는다. (root 경로 뒤에 location이 붙는다.)
  > <br/> `alias`: location에 매칭된 부분을 제거하고, alias로 설정한 경로에서 찾는다.

  ```
  location /static/ {
      root /var/www/app/static;
      autoindex off;
  }
  ```

  - /var/www/app/static/static 경로에서 찾는다.

  ```
  location /static/ {
      alias /var/www/app/static/;
      autoindex off;
  }
  ```

  - /var/www/app/static/ 에서 찾는다.

- `index`는 해당 path에서의 **entry point**다.
- 위에는 나와있지 않지만, `try_files`는 위 경로에서 static file(img, lib 파일들)을 찾으려고 할 때 설정해주는 경로이다.

### 최종 설정 파일

모든 부분을 공개할 수는 없지만, 대략적으로 최종 설정 파일은 아래와 같다.(수정한 부분만 정리하였다.)

```
...
location / {
    root /A/B

    ...

    location /C/D {
        alias /A/B/C/D/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
...
```

이미 돌아가고 있는 서비스가 있기 때문에 **root(/)**가 지정되어 있는 상태였다.

그 상태에서 내가 만든 것도 **/A/B**에 배포하였고, 원하는 요청 경로는 **/C/D**였다.

그래서 최종적으로 **build**까지 도달해야했기 때문에 `alias`를 사용했다.

## 추가적인 React 설정

배포를 완료하고 해당 URL로 실행해봤지만, 로딩되지 않았다.

아래는 내가 시도했던 과정이다.

1. Nginx 설정으로 모든 파일은 로딩되는 것 확인 (by. Chrome 개발자 도구)
   - 처음에는 특정 컴포넌트에 외부에서 호출해오는 코드가 있어서 방화벽으로 인해 막혀서 안되는 것이라 생각(회사 서버이기 때문에..)
   - 컴포넌트 하나하나 지워가면서 테스트 했지만 특별한 것을 발견하지는 못함
2. 최상위 컴포넌트(<App>)를 지우고 간단한 div 태그로 렌더링 시도 (성공)
   - 그렇다면 Redux-store(<Provider>)나 Router(<BrowserRouter>)에 문제가 있을 것이라고 생각
   - Provider 코드를 제거하고 Router에 대해서 테스트하였고, Local에서는 렌더링 되지만, 여전히 서버에서는 렌더링 되지 않음
   - 여기서 Route 처리 시, path를 제대로 읽지 못하는 것 같다는 생각
3. BrowserRouter에 대해서 좀 더 찾아봤고, `basename`이라는 property를 이용하여 Rendering Path를 설정한다는 것을 알게 됨

정리하자면 React에서 Router를 사용한다면 \<BrowserRouter\>에 `basename` property를 이용하여 위 Nginx 설정 파일에서 location으로 지정한 경로를 설정해줘야 한다.

```javascript
<BrowserRouter basename="/C/D">...</BrowserRouter>
```
