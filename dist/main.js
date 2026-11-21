"use strict";
var ThemeMode;
(function (ThemeMode) {
    ThemeMode["Light"] = "light";
    ThemeMode["Dark"] = "dark";
})(ThemeMode || (ThemeMode = {}));
const projects = [
    {
        id: "self-kindness",
        title: "التخلص من جلد الذات",
        description: "قالب مقال تثقيفي عن فهم الناقد الداخلي وبناء علاقة أرحم مع الذات؛ سيُكتب المحتوى لاحقًا.",
        category: "content",
        categoryLabel: "مقال تثقيفي",
        image: "./imgs/gentle-growth.svg",
        imageAlt: "رسم نباتي هادئ يرمز إلى الرفق بالذات",
        tags: ["الرفق بالذات", "وعي نفسي"],
        href: "./article.html",
    },
    {
        id: "perfectionism",
        title: "ورشة التخفف من الكمالية",
        description: "ورشة تثقيفية وتمارين انعكاسية لمراجعة معايير الكمال والتدرّب على أهداف واقعية.",
        category: "design",
        categoryLabel: "ورشة عمل",
        image: "./imgs/thoughtful-workshop.svg",
        imageAlt: "رسم نباتي هادئ يرمز إلى النمو التدريجي",
        tags: ["الكمالية", "خطوات عملية"],
        href: "./services.html",
    },
    {
        id: "self-esteem",
        title: "برنامج بناء تقدير الذات",
        description: "مسار تطوير ذاتي يركز على الوعي بالاحتياجات والحدود ونقاط القوة.",
        category: "web",
        categoryLabel: "برنامج تطوير ذاتي",
        image: "./imgs/self-worth.svg",
        imageAlt: "رسم نباتي هادئ يرمز إلى تقدير الذات",
        tags: ["تقدير الذات", "تطوير ذاتي"],
        href: "./services.html",
    },
    {
        id: "grounding",
        title: "لحظات للعودة إلى الحاضر",
        description: "تمارين بسيطة للانتباه للحظة الحالية، مع تذكير بأنها لا تستبدل الرعاية المتخصصة.",
        category: "design",
        categoryLabel: "تمرين تأملي",
        image: "./imgs/mindful-moment.svg",
        imageAlt: "رسم نباتي هادئ يدعو إلى التوقف والتأمل",
        tags: ["وعي باللحظة", "تأمل"],
        href: "./services.html",
    },
    {
        id: "support-circle",
        title: "مساحة حوار داعمة",
        description: "لقاء جماعي منظّم للتعلّم وتبادل الخبرات ضمن حدود آمنة ومحترمة.",
        category: "design",
        categoryLabel: "ورشة عمل",
        image: "./imgs/support-circle.svg",
        imageAlt: "رسم نباتي هادئ لمساحة حوار داعمة",
        tags: ["تواصل داعم", "مساحة آمنة"],
        href: "./services.html",
    },
    {
        id: "calm-routine",
        title: "روتين يومي أكثر هدوءًا",
        description: "اقتراحات مرنة للعناية بالنفس، تُكيّف مع ظروفك بدل تحويلها إلى قائمة واجبات.",
        category: "web",
        categoryLabel: "دليل عملي",
        image: "./imgs/calm-routine.svg",
        imageAlt: "رسم نباتي هادئ يرمز إلى العناية الذاتية",
        tags: ["عناية ذاتية", "توازن"],
        href: "./services.html",
    },
];
const services = [
    {
        title: "جلسات إرشاد واستشارة فردية",
        description: "مساحة حوار داعمة للتأمل في التحديات الشخصية وتحديد خطوات تطوير ذاتي مناسبة.",
        icon: "♡",
        features: ["أهداف واضحة", "إصغاء واحترام", "توضيح الحدود مسبقًا"],
    },
    {
        title: "ورش لتجاوز جلد الذات والكمالية",
        description: "ورش تثقيفية وتمارين انعكاسية تساعد على بناء علاقة أرحم مع الذات.",
        icon: "✦",
        features: ["أنشطة عملية", "وتيرة مرنة", "مجموعة باحترام متبادل"],
    },
    {
        title: "برامج لبناء تقدير الذات",
        description: "مسارات تطوير ذاتي منظمة لبناء وعي بالاحتياجات والحدود ونقاط القوة.",
        icon: "☼",
        features: ["تأملات أسبوعية", "أهداف قابلة للتعديل", "موارد تثقيفية"],
    },
];
const themeStorageKey = "khadija-wellbeing-theme";
const root = document.documentElement;
const themeToggle = getElement("#theme-toggle");
const themeIcon = getElement("#theme-icon");
const projectGrid = document.querySelector("#project-grid");
const projectEmpty = document.querySelector("#project-empty");
const filterButtons = document.querySelectorAll("[data-filter]");
const serviceGrid = document.querySelector("#service-grid");
const contactForm = document.querySelector("#contact-form");
const menuToggle = getElement("#menu-toggle");
const primaryMenu = getElement("#primary-menu");
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`العنصر المطلوب غير موجود في الصفحة: ${selector}`);
    }
    return element;
}
function readSavedTheme() {
    try {
        const savedTheme = window.localStorage.getItem(themeStorageKey);
        return savedTheme === ThemeMode.Dark || savedTheme === ThemeMode.Light ? savedTheme : null;
    }
    catch (error) {
        console.warn("تعذر قراءة تفضيل المظهر المحفوظ.", error);
        return null;
    }
}
function saveTheme(theme) {
    try {
        window.localStorage.setItem(themeStorageKey, theme);
    }
    catch (error) {
        console.warn("تعذر حفظ تفضيل المظهر في هذا المتصفح.", error);
    }
}
function renderTheme(theme) {
    const isDark = theme === ThemeMode.Dark;
    root.classList.toggle("dark", isDark);
    themeToggle.setAttribute("aria-label", isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن");
    themeIcon.innerHTML = isDark
        ? '<path stroke-linecap="round" stroke-linejoin="round" d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"/>'
        : '<circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
    getElement('meta[name="theme-color"]').content = isDark ? "#1e2921" : "#faf9f6";
}
function createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt;
    image.loading = "lazy";
    image.decoding = "async";
    const content = document.createElement("div");
    content.className = "project-card-content";
    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = project.categoryLabel;
    const title = document.createElement("h3");
    title.className = "mt-3 text-xl font-extrabold text-slate-950 dark:text-white";
    const titleLink = document.createElement("a");
    titleLink.href = project.href;
    titleLink.textContent = project.title;
    title.append(titleLink);
    const description = document.createElement("p");
    description.className = "mt-2 min-h-14 text-sm leading-7 text-slate-600 dark:text-slate-400";
    description.textContent = project.description;
    const tags = document.createElement("ul");
    tags.className = "mt-4 flex flex-wrap gap-2";
    tags.setAttribute("aria-label", "موضوعات المحتوى");
    for (const tag of project.tags) {
        const item = document.createElement("li");
        item.className = "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300";
        item.textContent = tag;
        tags.append(item);
    }
    const readMore = document.createElement("a");
    readMore.className = "mt-5 inline-flex font-bold text-indigo-600";
    readMore.href = project.href;
    readMore.textContent = project.category === "content" ? "اقرئي المزيد ←" : "اكتشفي التفاصيل ←";
    content.append(category, title, description, tags, readMore);
    article.append(image, content);
    article.dataset.projectId = project.id;
    return article;
}
function renderProjects(category = "all") {
    if (!projectGrid || !projectEmpty) {
        return;
    }
    const filteredProjects = category === "all" ? projects : projects.filter((project) => project.category === category);
    projectGrid.replaceChildren(...filteredProjects.map(createProjectCard));
    projectEmpty.classList.toggle("hidden", filteredProjects.length > 0);
}
function renderServices() {
    if (!serviceGrid) {
        return;
    }
    const cards = services.map((service) => {
        const article = document.createElement("article");
        article.className = "service-card";
        const icon = document.createElement("span");
        icon.className = "grid size-12 place-items-center rounded-2xl bg-indigo-50 text-xl font-extrabold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = service.icon;
        const title = document.createElement("h3");
        title.className = "mt-5 text-lg font-extrabold text-slate-950 dark:text-white";
        title.textContent = service.title;
        const description = document.createElement("p");
        description.className = "mt-2 min-h-14 text-sm leading-7 text-slate-600 dark:text-slate-400";
        description.textContent = service.description;
        const features = document.createElement("ul");
        features.className = "mt-4 space-y-2 text-sm font-semibold text-slate-600 dark:text-slate-300";
        for (const feature of service.features) {
            const item = document.createElement("li");
            item.className = "flex items-center gap-2";
            const check = document.createElement("span");
            check.className = "text-emerald-500";
            check.setAttribute("aria-hidden", "true");
            check.textContent = "✓";
            item.append(check, document.createTextNode(feature));
            features.append(item);
        }
        article.append(icon, title, description, features);
        return article;
    });
    serviceGrid.replaceChildren(...cards);
}
function isProjectCategory(value) {
    return value !== undefined && ["all", "web", "design", "content"].includes(value);
}
function initializeTheme() {
    const savedTheme = readSavedTheme();
    const initialTheme = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? ThemeMode.Dark : ThemeMode.Light);
    renderTheme(initialTheme);
    themeToggle.addEventListener("click", () => {
        const nextTheme = root.classList.contains("dark") ? ThemeMode.Light : ThemeMode.Dark;
        renderTheme(nextTheme);
        saveTheme(nextTheme);
    });
}
function initializeFilters() {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.filter;
            if (!isProjectCategory(category)) {
                throw new Error("تصنيف تصفية المشاريع غير معروف.");
            }
            filterButtons.forEach((filterButton) => {
                const isSelected = filterButton === button;
                filterButton.classList.toggle("is-active", isSelected);
                filterButton.setAttribute("aria-pressed", String(isSelected));
            });
            renderProjects(category);
        });
    });
    renderProjects();
}
function initializeFaq() {
    document.querySelectorAll(".faq-question").forEach((button) => {
        button.addEventListener("click", () => {
            const answerId = button.getAttribute("aria-controls");
            if (!answerId) {
                throw new Error("زر السؤال الشائع لا يشير إلى إجابته.");
            }
            const answer = getElement(`#${answerId}`);
            const isOpening = button.getAttribute("aria-expanded") !== "true";
            button.setAttribute("aria-expanded", String(isOpening));
            answer.setAttribute("aria-hidden", String(!isOpening));
            button.closest(".faq-item")?.classList.toggle("is-open", isOpening);
        });
    });
}
function initializeMobileMenu() {
    const closeMenu = () => {
        primaryMenu.classList.add("hidden");
        primaryMenu.classList.remove("flex");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
    };
    menuToggle.addEventListener("click", () => {
        const isOpening = menuToggle.getAttribute("aria-expanded") !== "true";
        menuToggle.setAttribute("aria-expanded", String(isOpening));
        menuToggle.setAttribute("aria-label", isOpening ? "إغلاق القائمة" : "فتح القائمة");
        primaryMenu.classList.toggle("hidden", !isOpening);
        primaryMenu.classList.toggle("flex", isOpening);
    });
    primaryMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
    window.matchMedia("(min-width: 768px)").addEventListener("change", closeMenu);
}
function validateContact(data, emailInput) {
    const errors = {};
    if (data.name.length < 2) {
        errors.name = "يرجى إدخال اسم مكوّن من حرفين على الأقل.";
    }
    if (!emailInput.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(data.email)) {
        errors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }
    if (data.message.length < 10) {
        errors.message = "يرجى كتابة تفاصيل لا تقل عن ١٠ أحرف.";
    }
    return errors;
}
function initializeContactForm() {
    if (!contactForm) {
        return;
    }
    const formStatus = getElement("#form-status");
    const nameInput = getElement("#contact-name");
    const emailInput = getElement("#contact-email");
    const messageInput = getElement("#contact-message");
    const fields = [
        { input: nameInput, error: getElement("#name-error"), key: "name" },
        { input: emailInput, error: getElement("#email-error"), key: "email" },
        { input: messageInput, error: getElement("#message-error"), key: "message" },
    ];
    fields.forEach(({ input, error }) => {
        input.addEventListener("input", () => {
            input.setAttribute("aria-invalid", "false");
            error.textContent = "";
            formStatus.textContent = "";
        });
    });
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
        };
        const errors = validateContact(data, emailInput);
        fields.forEach(({ input, error, key }) => {
            const message = errors[key] ?? "";
            error.textContent = message;
            input.setAttribute("aria-invalid", String(Boolean(message)));
        });
        const firstInvalidField = fields.find(({ key }) => Boolean(errors[key]))?.input;
        if (firstInvalidField) {
            formStatus.textContent = "راجعي الحقول المحددة ثم حاولي الإرسال مجددًا.";
            formStatus.className = "mt-4 min-h-6 text-sm font-bold text-rose-600";
            firstInvalidField.focus();
            return;
        }
        formStatus.textContent = `شكرًا لكِ ${data.name}، تم التحقق من رسالتك بنجاح. هذا النموذج لا يرسل البيانات إلى خادم حاليًا.`;
        formStatus.className = "mt-4 min-h-6 text-sm font-bold text-emerald-600 dark:text-emerald-400";
        contactForm.reset();
        fields.forEach(({ input }) => input.setAttribute("aria-invalid", "false"));
    });
}
initializeTheme();
initializeFilters();
renderServices();
initializeFaq();
initializeMobileMenu();
initializeContactForm();
getElement("#current-year").textContent = String(new Date().getFullYear());
