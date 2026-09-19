# BackDoor 개인정보 진단

# 프론트엔드 실행 방법

Node.js 18 이상 권장

```bash
node -v
npm -v
```

처음 실행할 때는 의존성을 설치합니다.

```bash
npm install
```

이후 개발 서버 실행:

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## macOS

```bash
cd ~/Downloads/campaign-main/campaign-main
npm install
npm run dev
```

## Windows PowerShell

```powershell
cd C:\Users\사용자이름\Downloads\campaign-main\campaign-main
npm install
npm run dev
```

## Windows CMD

```cmd
cd /d C:\Users\사용자이름\Downloads\campaign-main\campaign-main
npm install
npm run dev
```

## WSL

```bash
cd /mnt/c/Users/사용자이름/Downloads/campaign-main/campaign-main
npm install
npm run dev
```

## 오류 해결

아래 오류가 뜨는 경우:

```text
'next'은(는) 내부 또는 외부 명령...
```

의존성이 설치되지 않은 것이므로:

```bash
npm install
npm run dev
```

서버 종료는 모든 환경에서 `Ctrl + C`


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

