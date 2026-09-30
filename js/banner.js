document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.banner-scorll');
    const dots = document.querySelectorAll('.banner-dots .dot');

    if (!slider) return;

    let currentIndex = 0;
    const totalSlides = dots.length;
    const INTERVAL_TIME = 3000;
    let autoSlideTimer = null;

    // 도트 상태 업데이트
    function updateDots(index) {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    }

    // 특정 슬라이드로 이동
    function goToSlide(index) {
        currentIndex = index;
        const slideWidth = slider.clientWidth;
        slider.scrollTo({
            left: slideWidth * currentIndex,
            behavior: 'smooth'
        });
        updateDots(currentIndex);
    }

    // 4초 자동 전환 (1 -> 2 -> 3 -> 1 무한 반복)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(nextSlide, INTERVAL_TIME);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }
    slider.addEventListener('mousemove', (e) => {
        // 자동 슬라이드 일시 정지
        stopAutoSlide();

        const rect = slider.getBoundingClientRect();
        // 배너 영역 내 마우스 X 좌표 (0 ~ 배너 전체 너비)
        const mouseX = e.clientX - rect.left;
        const sliderWidth = rect.width;

        // 마우스 위치 비율 (0.0 ~ 1.0)
        const mouseRatio = Math.max(0, Math.min(1, mouseX / sliderWidth));

        // 배너 전체 스크롤 가능 길이 (전체 스크롤 너비 - 보이는 너비)
        const maxScrollLeft = slider.scrollWidth - sliderWidth;

        // 마우스 위치 비율에 맞춰 스크롤 위치 설정
        slider.scrollLeft = maxScrollLeft * mouseRatio;

        // 현재 스크롤 위치에 맞춰서 축을 잡고 이동
        const newIndex = Math.round(slider.scrollLeft / sliderWidth);
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateDots(currentIndex);
        }
    });

   //마우스가 배너 영역을 벗어나면 재시작
    slider.addEventListener('mouseleave', () => {
        const slideWidth = slider.clientWidth;
        currentIndex = Math.round(slider.scrollLeft / slideWidth);
        goToSlide(currentIndex);
        startAutoSlide();
    });

    // 도트 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoSlide();
        });
    });

    // 최초 4초 무한 루프 시작
    startAutoSlide();
});