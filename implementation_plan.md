# 📋 Vibe To-Do List 구현 계획서

Supabase와 Vercel을 활용하여 세련된 디자인과 부드러운 사용자 경험을 제공하는 할 일 관리 앱을 구축합니다.

---

## 1. 프로젝트 개요
- **목표**: 사용자가 로그인을 통해 자신의 할 일을 관리하고, 모든 기기에서 실시간으로 동기화되는 프리미엄 To-Do 앱 개발.
- **핵심 가치**: 시각적 탁월함(Visual Excellence), 매끄러운 인터랙션(Micro-interactions), 보안(RLS).

## 2. 기술 스택 (Tech Stack)
- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Backend / Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
- **Styling**: Vanilla CSS (Custom Design System)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 3. 기능 명세 (Feature Specifications)

### 3.1 사용자 인증 (Authentication)
- Supabase Auth를 이용한 이메일/비밀번호 가입 및 로그인.
- (선택 사항) Google / GitHub 소셜 로그인 연동.

### 3.2 할 일 관리 (Task Management)
- **CRUD Operations**: 할 일 추가, 목록 조회, 상태 수정(완료/미완료), 삭제.
- **Sorting & Filtering**: 생성일순, 상태별(전체/진행/완료) 필터링.
- **Realtime**: Supabase Realtime을 통한 실시간 데이터 업데이트.

### 3.3 사용자 경험 (UX)
- **Optimistic Updates**: 서버 응답 전 UI를 먼저 업데이트하여 지연 없는 느낌 제공.
- **Responsive Design**: 데스크톱, 테블릿, 모바일 완벽 지원.
- **Glassmorphism UI**: 현대적이고 깊이감 있는 비주얼 디자인.

---

## 4. 데이터베이스 및 보안 설계 (Database & Security)

### 4.1 테이블 구조
- `profiles`: 사용자의 기본 정보 (id, nickname, avatar_url).
- `todos`: 할 일 상세 내역
  - `id`: uuid (PK)
  - `user_id`: uuid (FK to auth.users)
  - `title`: text
  - `is_completed`: boolean (default: false)
  - `created_at`: timestamptz

### 4.2 RLS (Row Level Security) 정책
- 모든 사용자는 자신의 `user_id`와 일치하는 데이터에 페해서만 `SELECT`, `INSERT`, `UPDATE`, `DELETE` 권한을 가짐.

---

## 5. 디자인 시스템 (Design System)

### 5.1 Color Palette
- **Primary**: Deep Blue & Vibrant Purple Gradient
- **Background**: Dark Mode (Slate 950 / Deep Black)
- **Accent**: Neon Cyan (for active states)

### 5.2 Typography
- Main: 'Inter' or 'Outfit' (Google Fonts)
- 스타일 포인트: 명확한 계층 구조와 넉넉한 자간 활용

---

## 6. 개발 로드맵 (Roadmap)

### Step 1: 프로젝트 기초 설정
- [x] Next.js 프로젝트 초기화
- [x] Supabase 프로젝트 생성 및 테이블 설정 (SQL 스크립트 작성 완료)
- [x] Vanilla CSS 라이브러리/토큰 구축

### Step 2: UI 및 컴포넌트 개발
- [x] 레이아웃 및 내비게이션 바 디자인
- [x] To-Do 입력 필드 및 리스트 컴포넌트 구현
- [x] Framer Motion을 활용한 애니메이션 적용

### Step 3: 백엔드 연동 (Supabase)
- [x] Auth 기능 구현 (매직 링크 로그인/로그아웃)
- [x] CRUD API 연동 (데이터베이스 작업 자동화)
- [x] 실시간 데이터 업데이트 환경 구축 (낙관적 업데이트 적용)

### Step 4: 폴리싱 및 배포
- [ ] Vercel 배포 진행
- [ ] 환경 변수 설정
- [ ] 최종 QA 및 성능 최적화

---

## 7. SEO 및 메타데이터
- OpenGraph 이미지 설정 (Preview)
- 접근성을 고려한 시맨틱 마크업 사용
