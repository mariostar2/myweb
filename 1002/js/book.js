document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");

    // 1. 페이지가 열릴 때 책장이 펴지는 효과 (인라인 스타일 적용)
    if (container) {
        container.style.transform = "rotateY(90deg)";
        container.style.opacity = "0";

        setTimeout(() => {
            container.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease";
            container.style.transform = "rotateY(0deg)";
            container.style.opacity = "1";
        }, 50);
    }

    // 2. 버튼을 누를 때 책장이 넘어가는 효과
    const links = document.querySelectorAll("a.btn");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetUrl = this.getAttribute("href");
            const btnText = this.innerText;

            if (targetUrl && !targetUrl.startsWith("#") && targetUrl !== "") {
                e.preventDefault();

                // ★ 핵심: 인라인 스타일을 비워주어야 CSS 클래스 애니메이션이 정상 작동합니다!
                if (container) {
                    container.style.transition = "transform 0.6s ease, opacity 0.6s ease";
                    container.style.transform = "";
                    container.style.opacity = "";
                }

                // '이전'과 '다음'에 따라 클래스 부여
                if (btnText.includes("이전")) {
                    document.body.classList.add("page-flip-prev");
                } else {
                    document.body.classList.add("page-flip-next");
                }

                // 0.6초 애니메이션 후 페이지 이동
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 700);
            }
        });
    });
});