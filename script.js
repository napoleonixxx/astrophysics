document.addEventListener("DOMContentLoaded", () => {

    const cosmoQuizDatabase = [
        {
            question: "Что, согласно принципу космической цензуры Роджера Пенроуза, должно скрывать гравитационную сингулярность от внешнего наблюдателя?",
            options: [
                "Эргосфера вращения Керра",
                "Абсолютный горизонт частиц",
                "Горизонт событий черной дыры",
                "Плотное облако реликтового излучения"
            ],
            correct: 2
        },
        {
            question: "Какое физическое свойство органики (абсолютное преобладание одного оптического изомера в ДНК и белках) является фундаментальным маркером жизни на экзопланетах?",
            options: [
                "Транзитная фотолизная инверсия",
                "Молекулярная гомохиральность",
                "Кремний-органическая полимеризация",
                "Релятивистское замедление спина"
            ],
            correct: 1
        },
        {
            question: "Какое событие ознаменует наступление 'Эпохи распада барионов' через 10⁴⁰ лет, полностью уничтожив концепцию химических элементов?",
            options: [
                "Распад протона на позитроны, электроны и фотоны",
                "Испарение последних сверхмассивных черных дыр",
                "Столкновение Млечного Пути со скоплением Ланиакея",
                "Остывание белых карликов до состояния черных карликов"
            ],
            correct: 0
        },
        {
            question: "Какая аномалия пространства-времени характерна для эргосферы вращающихся черных дыр Керра?",
            options: [
                "Материя мгновенно распадается на чистые кремниевые силаны",
                "Пространство увлекается во вращение со скоростью выше скорости света",
                "Время полностью останавливается как для внешнего, так и для внутреннего наблюдателя",
                "Излучение Хокинга удваивает массу падающего объекта"
            ],
            correct: 1
        }
    ];

    let activeQuestionIndex = 0;
    let quizScore = 0;
    let optionSelected = false;

    const quizTitle = document.getElementById("quiz-question-title");
    const quizOptionsBlock = document.getElementById("quiz-options-block");
    const quizNextBtn = document.getElementById("next-question-btn");
    const quizResultsBlock = document.getElementById("quiz-results-block");
    const quizRestartBtn = document.getElementById("restart-quiz-btn");

    function startQuizEngine() {
        activeQuestionIndex = 0;
        quizScore = 0;
        if (quizResultsBlock) quizResultsBlock.style.display = "none";
        if (quizNextBtn) quizNextBtn.style.display = "none";
        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        optionSelected = false;
        if (quizNextBtn) quizNextBtn.style.display = "none";
        if (quizOptionsBlock) quizOptionsBlock.innerHTML = "";

        const currentQuestion = cosmoQuizDatabase[activeQuestionIndex];
        if (quizTitle) {
            quizTitle.textContent = `Узел ${activeQuestionIndex + 1}: ${currentQuestion.question}`;
        }

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.className = "quiz-option-btn";
            button.textContent = option;
            button.addEventListener("click", () => evaluateUserSelection(index, button));
            if (quizOptionsBlock) quizOptionsBlock.appendChild(button);
        });
    }

    function evaluateUserSelection(selectedIndex, clickedButton) {
        if (optionSelected) return; 
        optionSelected = true;

        const currentQuestion = cosmoQuizDatabase[activeQuestionIndex];
        const allOptionButtons = quizOptionsBlock.querySelectorAll(".quiz-option-btn");

        if (selectedIndex === currentQuestion.correct) {
            clickedButton.classList.add("correct-choice");
            quizScore++;
        } else {
            clickedButton.classList.add("wrong-choice");
           
            allOptionButtons[currentQuestion.correct].classList.add("correct-choice");
        }

        if (quizNextBtn) {
            quizNextBtn.style.display = "block";
            if (activeQuestionIndex === cosmoQuizDatabase.length - 1) {
                quizNextBtn.textContent = "Сформировать отчет";
            } else {
                quizNextBtn.textContent = "Перейти к следующему узлу";
            }
        }
    }

    if (quizNextBtn) {
        quizNextBtn.addEventListener("click", () => {
            activeQuestionIndex++;
            if (activeQuestionIndex < cosmoQuizDatabase.length) {
                renderQuizQuestion();
            } else {
                displayQuizFinalMetrics();
            }
        });
    }

    function displayQuizFinalMetrics() {
        if (quizTitle) quizTitle.textContent = "Анализ завершен";
        if (quizOptionsBlock) quizOptionsBlock.innerHTML = "";
        if (quizNextBtn) quizNextBtn.style.display = "none";

        document.getElementById("quiz-score-val").textContent = quizScore;
        document.getElementById("quiz-total-val").textContent = cosmoQuizDatabase.length;

        const verdictElement = document.getElementById("quiz-verdict");
        const successRate = (quizScore / cosmoQuizDatabase.length) * 100;

        if (successRate === 100) {
            verdictElement.textContent = "Синхронизация 100%. Ваша теоретическая квалификация полностью соответствует стандартам лаборатории квантовой космологии. Ошибок в дешифровке релятивистских сингулярностей не обнаружено.";
        } else if (successRate >= 50) {
            verdictElement.textContent = "Синхронизация частичная. Допущены погрешности в вычислении энтропии или термодинамических границ альтернативной биохимии. Доступ к терминалу предоставлен с ограничениями.";
        } else {
            verdictElement.textContent = "Критический сбой дешифровки. Уровень понимания законов деградации материи критически низок. Рекомендуется полностью очистить кэш памяти и повторно изучить факты на панели приборов.";
        }

        if (quizResultsBlock) quizResultsBlock.style.display = "block";
    }

    if (quizRestartBtn) {
        quizRestartBtn.addEventListener("click", startQuizEngine);
    }


    startQuizEngine();


    const btnWeight = document.getElementById("run-weight-calc");
    if (btnWeight) {
        btnWeight.addEventListener("click", () => {
            const earthWeight = parseFloat(document.getElementById("user-weight").value);
            
            if (isNaN(earthWeight) || earthWeight <= 0) {
                alert("Введите корректное значение массы тела.");
                return;
            }


            const moonWeight = (earthWeight * 0.165).toFixed(1);
            const marsWeight = (earthWeight * 0.38).toFixed(1);

            document.getElementById("res-moon").textContent = moonWeight;
            document.getElementById("res-mars").textContent = marsWeight;
        });
    }

    const btnDrake = document.getElementById("run-drake-calc");
    if (btnDrake) {
        btnDrake.addEventListener("click", () => {
            const r = parseFloat(document.getElementById("drake-r").value) || 0;
            const fp = parseFloat(document.getElementById("drake-fp").value) || 0;
            const ne = parseFloat(document.getElementById("drake-ne").value) || 0;
            const fl = parseFloat(document.getElementById("drake-fl").value) || 0;
            const fi = parseFloat(document.getElementById("drake-fi").value) || 0;
            const fc = parseFloat(document.getElementById("drake-fc").value) || 0;
            const l = parseFloat(document.getElementById("drake-l").value) || 0;


            const N = Math.round(r * fp * ne * fl * fi * fc * l);

            document.getElementById("res-drake").textContent = N.toLocaleString();
        });
    }


    const tabTriggers = document.querySelectorAll(".tab-trigger");
    const dataPanels = document.querySelectorAll(".data-panel");

    tabTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            tabTriggers.forEach(t => t.classList.remove("active"));
            dataPanels.forEach(p => p.classList.remove("active"));

            trigger.classList.add("active");
            const targetId = trigger.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });

  
    const canvas = document.getElementById("cosmic-engine");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let backgroundField = []; 
    let bolides = [];         
    let spaceDust = [];        

    let mouse = { x: null, y: null };

    function syncDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateField();
    }


    function generateField() {
        backgroundField = [];
        const density = Math.floor((canvas.width * canvas.height) / 4500);
        
        for (let i = 0; i < density; i++) {
            backgroundField.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.6 + 0.5, 
                opacity: Math.random() * 0.5 + 0.5, 
                frequency: Math.random() * 0.02 + 0.005
            });
        }
    }


    function createAutomaticBolide() {

        const fromLeft = Math.random() > 0.5;
        
        bolides.push({
            x: fromLeft ? Math.random() * (canvas.width * 0.4) : canvas.width * 0.6 + Math.random() * (canvas.width * 0.4),
            y: -60, 
            vectorX: fromLeft ? Math.random() * 7 + 5 : -(Math.random() * 7 + 5),  
            vectorY: Math.random() * 5 + 4, 
            length: Math.random() * 160 + 100, 
            energy: 1.0, 
            decay: Math.random() * 0.012 + 0.006, 
            size: Math.random() * 1.5 + 1.5 
        });
    }

    function triggerUserMeteor(originX, originY) {

        const toRight = originX < canvas.width / 2;

        bolides.push({
            x: originX,
            y: originY,
            vectorX: toRight ? Math.random() * 9 + 7 : -(Math.random() * 9 + 7),  
            vectorY: Math.random() * 6 + 5,  
            length: Math.random() * 200 + 120, 
            energy: 1.0, 
            decay: Math.random() * 0.018 + 0.01,
            size: 2.5 
        });
    }

    function emitSpaceDust(mouseX, mouseY) {
        for (let i = 0; i < 2; i++) {
            spaceDust.push({
                x: mouseX + (Math.random() * 12 - 6), 
                y: mouseY + (Math.random() * 12 - 6),
                radius: Math.random() * 1.5 + 0.4,
                opacity: 0.9,
                vectorX: Math.random() * 0.8 - 0.4, 
                vectorY: Math.random() * 0.5 + 0.3,  
                decay: Math.random() * 0.025 + 0.015  
            });
        }
    }

    function renderFrame() {
        ctx.fillStyle = "#0a0a0c"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        backgroundField.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(241, 245, 249, ${particle.opacity})`; 
            ctx.fill();

            particle.opacity += particle.frequency;
            if (particle.opacity > 1.0 || particle.opacity < 0.4) {
                particle.frequency = -particle.frequency;
            }
        });

        for (let i = spaceDust.length - 1; i >= 0; i--) {
            let dust = spaceDust[i];
            ctx.beginPath();
            ctx.arc(dust.x, dust.y, dust.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(148, 163, 184, ${dust.opacity})`; 
            ctx.fill();

            dust.x += dust.vectorX;
            dust.y += dust.vectorY;
            dust.opacity -= dust.decay;

            if (dust.opacity <= 0) {
                spaceDust.splice(i, 1);
            }
        }

        for (let i = bolides.length - 1; i >= 0; i--) {
            let b = bolides[i];

            ctx.beginPath();
            let ray = ctx.createLinearGradient(
                b.x, b.y, 
                b.x - b.vectorX * 8, b.y - b.vectorY * 8
            );

            ray.addColorStop(0, `rgba(255, 255, 255, ${b.energy})`); 
            ray.addColorStop(0.15, `rgba(0, 255, 136, ${b.energy * 0.7})`); 
            ray.addColorStop(0.4, `rgba(148, 163, 184, ${b.energy * 0.4})`); 
            ray.addColorStop(1, "rgba(0, 0, 0, 0)"); 

            ctx.strokeStyle = ray;
            ctx.lineWidth = b.size;
            ctx.lineCap = "round";
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x - b.vectorX * 8, b.y - b.vectorY * 8);
            ctx.stroke();

    
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${b.energy})`;
            ctx.fill();
            
   
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${b.energy * 0.3})`;
            ctx.fill();

 
            b.x += b.vectorX;
            b.y += b.vectorY;
            b.energy -= b.decay;


            if (b.energy <= 0 || b.x > canvas.width + 100 || b.x < -100 || b.y > canvas.height + 100) {
                bolides.splice(i, 1);
            }
        }


        if (Math.random() < 0.02 && bolides.length < 4) {
            createAutomaticBolide();
        }

        requestAnimationFrame(renderFrame);
    }

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        emitSpaceDust(mouse.x, mouse.y);
    });

    window.addEventListener("mousedown", (e) => {
        if (!e.target.classList.contains("tab-trigger")) {
            triggerUserMeteor(e.clientX, e.clientY);
        }
    });

    window.addEventListener("resize", syncDimensions);

    syncDimensions();
    renderFrame();
});
