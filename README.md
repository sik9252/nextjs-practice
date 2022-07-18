## 본격적인 Next.js 사용을 위한 간단한 공부 기록

### 1. React.js 는 CSR

create-react-app은 client side render하는 앱을 만든다.
CSR은 유저가 보는 UI를 만드는 모든 일을 브라우저가 한다는 의미.
즉, 유저가 보는 HTML이 소스코드 안에 들어가 있지 않음. view-source로 확인해보면 오로지 `<div id="root"></div>`만 있는 것을 볼 수 있음.

즉, 과정을 간단하게 정리해보면,

브라우저가 react.js 다운 -> 내 코드 다운 -> react.js가 다른 모든 것들을 렌더링 -> 드디어 유저가 눈으로 보게됨

**정리**

브라우저가 처음 HTML을 가져올 때는 비어있는 div로 가져오고 그 후 브라우저가 자바스크립트를 요청해 자바스크립트와 react를 실행시키고 그 후에 유저에게 UI들이 보이게 될 것.
그래서 느린 인터넷 환경과 같은 곳에서 react로만 구성된 앱을 실행하면 아무것도 없는 빈 하얀 화면에서 오랜 시간을 기다린 후 점차 UI가 보이는 것을 확인할 수 있는데, 이것은 느린 인터넷 환경을 가진 사용자 입장에서는 아주 불편한 일!

<hr>

### 2. 그럼 Next.js는 ?

React로 만들었을 때 빈 HTML을 가져오는 것과 달리 Next로 생성하면 빈 div가 아닌 실제 HTML이 담겨있는 것을 볼 수 있음. 따라서 매우 느린 환경에서 사용하거나, 자바스크립트가 비활성화 되어있다해도 최소한 시각적인 요소의 HTML은 빠르게 볼 수 있다는 장점을 가지고 있음.

즉, next.js는,

react를 백엔드에서 동작시켜 페이지를 미리 만들고 -> 컴포넌트를 렌더링 -> 렌더링 끝나면 HTML이 되고 -> 해당 HTML을 소스코드에 넣어줌 -> 유저는 자바스크립트와 react가 아직 로딩되지 않아도 UI는 볼 수 있음 -> 유저가 모든 자바스크립트를 다운로드 하면 react가 주도권 가져가며 보통의 react와 같이 동작

따라서 사용자 입장에서는 조금 더 친화적임!

또한, 빈 HTML을 받는 것이 아니고 내용도 같이 받아오기 때문에 SEO에도 좋음.

<hr>

### 3. pages

react.js component를 export 하고 있는 파일들을 담으면 된다. 주의할 점은 component를 export default 해야함.

예외사항

- index.js
  - /index라는 도메인 아님. 그저 localhost:3000/

<hr>

### 4. Routing

Next에서는 a 태그를 이용한 앵커를 사용해 네비게이팅을 구현하면 빨간줄이 뜨며 사용하지 말라고 한다. 왜나하면 Next에는 네비게이팅을 구현할 때 사용하는 특정 컴포넌트가 존재하기 때문인데, 이것을 사용하지 않고 그냥 a 태그로 구현한다면 페이지를 이동시키기 위해 전체 페이지를 새로고침하는 현상이 일어나기 떄문에 느려질 수 있다. 따라서 `next/link의 Link라는 컴포넌트를 사용`한다. (리액트의 Link to를 사용하는 것과 비슷한 이유)

```js
<nav>
  <Link href="/">
    <a>Home</a>
  </Link>
  <Link href="/about">
    <a>About</a>
  </Link>
</nav>
```

위 코드처럼 Link 안에 a태그를 또 작성하는 이유는 Link에 className과 스타일을 적용하면 적용이 안되기 때문에 Link는 오로지 href를 위해 사용하는 것이고, className과 같은 나머지는 모두 a태그 옆에 적는다.

**const router = useRouter();**

console.log(router)를 해보면 아래와 같은 프로퍼티들이 존재하는 것을 볼 수 있다.

![image](https://user-images.githubusercontent.com/64947440/179444614-1f5749ca-9190-4ef1-b409-634d522f709b.png)

router의 프로퍼티들을 사용해 아래와 같이 해당 메뉴를 클릭했을 때 색상을 바꾸는 등 여러 작업을 편리하게 수행할 수 있다.

```js
<a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
<a style={{ color: router.pathname === "/about" ? "red" : "blue" }}>Home</a>
```

![image](https://user-images.githubusercontent.com/64947440/179444812-298f3726-c1b9-45b6-bf82-122e31e5346f.png)

<hr>

### 5. CSS Modules

`파일명.module.css` 라는 이름으로 css 파일을 만든 후 해당 스타일을 사용할 컴포넌트로 가서 `import styles from "../styles/NavBar.module.css";`와 같이 해당 스타일시트를 불러온다. 그 후 `<nav className={styles.nav}>`와 같은 식으로 선언한 스타일을 적용할 수 있다.

주의할 점은 기존에 클래스 이름을 추가할 때 사용한 `<nav className="nav">`와 같은 방식이 아닌 자바스크립트 오브젝트에서의 프로퍼티 형식으로 적어주는 것에 주의한다.

이러한 접근 방식의 장점은 원래는 클래스명이 겹치면 서로 충돌해 스타일이 원하는대로 나타나지 않는 현상이 발생했는데, 오브젝트에서의 프로퍼티 형식으로 작성한다면 고유한 클래스명을 갖게 되기 때문에 같은 클래스명을 사용해도 충돌이 일어나지 않는다.

이러한 방식을 이용해 위에서 하드코딩했던 스타일을 바꿔보자.

```js
<a className={router.pathname === "/" ? styles.active : ""}>Home</a>
<a className={router.pathname === "/about" ? styles.active : ""}>
```

**하나의 엘리먼트에 2개의 클래스 이름을 적용하는 방법**

1. `과 ${ } 사용하기

```js
<a className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}>
  Home
</a>
```

2. [ ] 사용하기

```js
<a
  className={[
    styles.link,
    router.pathname === "/about" ? styles.active : "",
  ].join(" ")}
>
  About
</a>
```

### 6. Styled-jsx 👍

Next.js에 기본 내장 되어있는 styled-jsx 방식이다. 이는 컴포넌트 단위로 적용되며 아래는 기본적인 사용 방법이다.
고로, 다른 컴포넌트에는 중복 클래스명을 사용해도 적용되지 않는다!

```js
<nav>
  <Link href="/">
    <a className={router.pathname === "/" ? "active" : ""}>Home</a>
  </Link>
  <Link href="/about">
    <a className={router.pathname === "/about" ? "active" : ""}>About</a>
  </Link>
  // 이부분이 스타일 적용하는 부분
  <style jsx>{`
    nav {
      background-color: #ff6437;
    }
    a {
      margin: 5px;
      font-size: 0.9rem;
    }
    .active {
      color: white;
    }
  `}</style>
</nav>
```

<hr>

### 7. Global Styles 추가하기

만약 자식 컴포넌트까지 동일한 클래스명을 가진 스타일을 적용하고 싶다면 `<style global jsx>`를 사용하면 된다.

그런데 이건 진짜 전역 스타일은 아니다. 다른 컴포넌트(페이지)로 넘어가게 되면 그 컴포넌트에도 동일한 스타일을 주지 않는 이상 다른 페이지에는 적용되지 않는다. 그리고 NavBar 같이 여러개의 페이지에서 중복으로 사용되는 컴포넌트들도 매번 필요한 페이지마다 import 하는건 비효율적이다.

따라서 이런 비효율성을 해결하기 위한 방법은 다음과 같다.

전역적으로 적용되어야 할 컴포넌트들과 스타일들은 `pages 폴더 안의 _app.js 파일에 작성`하는 것.

이렇게 하면 Next.js가 index.js를 렌더링하기 전에 \_app.js를 먼저 확인하고 청사진을 확인해서 index.js의 내용물을 렌더링하기 때문에 \_app.js 안의 내용은 전역적으로 적용된다.
