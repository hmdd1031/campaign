# BackDoor 개인정보 진단

프론트엔드 연동 


## VS Code에서 실행하는 법

1. **Node.js 설치 확인** (18버전 이상 권장)
   터미널에서 `node -v` 로 확인. 없다면 https://nodejs.org 에서 LTS 버전 설치.

2. **VS Code에서 이 폴더 열기**
   `파일 > 폴더 열기` 로 `backdoor-privacy-check` 폴더 선택.

3. **터미널 열기**
   VS Code 상단 메뉴 `Terminal > New Terminal` (단축키: `` Ctrl+` ``)

4. **의존성 설치** (최초 1회만)
   ```
   npm install
   ```

5. **개발 서버 실행**
   ```
   npm run dev
   ```
   터미널에 `Local: http://localhost:3000` 이 뜨면, 브라우저에서 그 주소로 접속하면 됩니다.
   (VS Code가 자동으로 "브라우저에서 열기" 알림을 띄우기도 해요.)

6. **코드 수정하면 자동 반영**
   `npm run dev` 를 켜둔 채로 파일을 저장하면 브라우저가 자동으로 새로고침됩니다 (Hot Reload).

7. **종료**
   터미널에서 `Ctrl + C`



## 폴더 구조

```
backdoor-privacy-check/
├─ app/
│  ├─ layout.js          # 루트 레이아웃 (폰트, 메타데이터)
│  ├─ page.js            # 진입점 (App 컴포넌트 렌더링)
│  └─ globals.css        # Tailwind 전역 스타일
├─ components/
│  ├─ App.js             # 화면 전환(랜딩/체크리스트/결과/솔루션) 상태 관리
│  ├─ TopBar.js           # 공통 상단바
│  ├─ ShieldIllustration.js  # 랜딩 일러스트
│  ├─ ProgressBar.js      # 체크리스트 진행바
│  ├─ RadarChart.js       # Chart.js 레이더 차트 (결과 화면)
│  └─ screens/
│     ├─ LandingScreen.js     # 화면 1: 랜딩
│     ├─ ChecklistScreen.js   # 화면 2: 체크리스트
│     ├─ ResultScreen.js      # 화면 3: 결과
│     └─ SolutionScreen.js    # 화면 4: 맞춤 솔루션 + 실천 서약
├─ lib/
│  ├─ checkService.js    # 점수 계산 + submitCheckResult (1단계 로컬 / 2단계 백엔드 전환용)
│  └─ iconMap.js          # 솔루션 아이콘 이름(문자열) → lucide-react 컴포넌트
├─ data/
│  └─ checklist.json     # 문항·솔루션 데이터 (기획팀이 이 파일만 수정하면 됨)
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ next.config.js
└─ jsconfig.json          # `@/` 경로 별칭 설정
```


## 다음 단계 (2단계, 백엔드)

## .Env.local 파일생성해야함
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY= ~~~ #키라서 리드미에 올리지 않았습니다!! / 노션에 올려놨어요

