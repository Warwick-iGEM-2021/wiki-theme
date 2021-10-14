/**
 * ASB - Accessibility Settings Bar
 * version 0.5
 * https://github.com/brenonovelli/Accessibility-Settings-Bar
 */

(function () {

    // Key that will be used to complement the keyboard shortcut.
    const accessKey = 4;

    // Button definitions
    const btns = {
        btnIncFont: {
            active: true,
            dataAccessibility: "incFont",
            class: "setAccessibility",
            icon: "A+",
            iconClass: "",
            text: "Increase font size",
        },
        btnOriFont: {
            active: true,
            dataAccessibility: "oriFont",
            class: "setAccessibility",
            icon: "Aa",
            iconClass: "",
            text: "Original font size",
        },
        btnDecFont: {
            active: true,
            dataAccessibility: "decFont",
            class: "setAccessibility",
            icon: "A-",
            iconClass: "",
            text: "Shrink font size",
        },
        btnReadingLine: {
            active: true,
            dataAccessibility: "readingLine",
            class: "setAccessibility",
            icon: "FontAwesome",
            iconClass: ["fas", "fa-ruler-horizontal"],
            text: "Reading line",
        },
        btnReset: {
            active: true,
            dataAccessibility: "reset",
            class: "setAccessibility",
            icon: "FontAwesome",
            iconClass: ["fas", "fa-redo-alt"],
            text: "Reset",
        },
    }

    /**
     * Creating the bar
     */

    const accessibilityBar = document.createElement("div");
    accessibilityBar.id = "accessibilityBar";
    document.body.insertBefore(accessibilityBar, document.body.firstChild);

    /**
     * Creating main button
     */
    let btnAccessibilityBar;

    function createMainButton() {
        btnAccessibilityBar = document.createElement("button");
        btnAccessibilityBar.id = "universalAccessBtn";
        btnAccessibilityBar.type = "button";
        btnAccessibilityBar.accessKey = accessKey;
        accessibilityBar.appendChild(btnAccessibilityBar);

        const icon = document.createElement("i");
        btnAccessibilityBar.appendChild(icon);
        icon.classList.add("fas", "fa-universal-access");

        const spanText = document.createElement("span");
        const spanTextNode = document.createTextNode("Accessibility menu");
        spanText.appendChild(spanTextNode);
        btnAccessibilityBar.appendChild(spanText);
    }
    createMainButton();

    /**
     * Creating anothers button
     */

    function createButtons(el) {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add(el.class);
        button.setAttribute('data-accessibility', el.dataAccessibility);
        accessibilityBar.appendChild(button);

        const wrapIcon = document.createElement("strong");
        button.appendChild(wrapIcon);

        if (el.icon === "FontAwesome") {
            const icon = document.createElement("i");
            wrapIcon.appendChild(icon);
            icon.classList.add(...el.iconClass);
        } else {
            const textIcon = document.createTextNode(el.icon);
            wrapIcon.appendChild(textIcon);
        }

        const textButton = document.createTextNode(el.text);
        button.appendChild(textButton);
    }
    Object.keys(btns).forEach(function (item) {
        if (btns[item].active) {
            createButtons(btns[item]);
        }
    });


    const html = document.documentElement; //<html> for font-size settings
    const body = document.body; //<body> for the adjusts classes
    const btnAccessibility = document.querySelectorAll(".setAccessibility"); // Getting settings buttons

    if (btnAccessibilityBar) {
        setTimeout(function () {
            btnAccessibilityBar.classList.add("collapsed");
        }, 2000);
    }

    /**
     * ReadingLine
     */

    const readingLine = document.createElement("div");
    readingLine.id = "readingLine";
    document.body.insertBefore(readingLine, document.body.firstChild);

    function moveReadingLine(e) {
        if (body.classList.contains("accessibility_readingLine")) {
            let linePositionY = e.pageY - 20;
            console.log(linePositionY);
            const elReadingLine = document.querySelector("#readingLine"); // Toggle button
            elReadingLine.style.top = `${linePositionY}px`;
        }
    }

    html.addEventListener("mousemove", function (e) { moveReadingLine(e); });

    // TODO: Fix this to also move around on scroll???
    //html.addEventListener("onscroll", function (e) { moveReadingLine(e);});


    /*
  === === === === === === === === === === === === === === === === === ===
  === === === === === === === === openBar === === === === === === === ===
  === === === === === === === === === === === === === === === === === ===
  */

    btnAccessibilityBar.addEventListener("click", () =>
        accessibilityBar.classList.toggle("active")
    );

    /*
  === === === === === === === === === === === === === === === === === ===
  === === === === === ===  toggleAccessibilities  === === === === === ===
  === === === === === === === === === === === === === === === === === ===
  */

    function toggleAccessibilities(action) {
        switch (action) {
            case "incFont":
            case "oriFont":
            case "decFont":
                window.toggleFontSize(action);
                drawPath();
                break;
            case "readingLine":
                body.classList.toggle("accessibility_readingLine");
                break;
            case "reset":
                window.toggleFontSize("oriFont");
                body.classList.remove("accessibility_readingLine");
                break;
            default:
                break;
        }
        accessibilityBar.classList.toggle("active");
    }

    btnAccessibility.forEach(button =>
        button.addEventListener("click", () =>
            toggleAccessibilities(button.dataset.accessibility)
        )
    );

    /*
  === === === === === === === === === === === === === === === === === ===
  === === === === === === ===  FontSize   === === === === === === === ===
  === === === === === === === === === === === === === === === === === ===
  */

    const htmlFontSize = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("font-size")
    );
    let FontSize = {
        storage: "fontSizeState",
        cssClass: "fontSize",
        currentState: null,
        check: checkFontSize,
        getState: getFontSizeState,
        setState: setFontSizeState,
        toggle: toggleFontSize,
        updateView: updateViewFontSize
    };

    window.toggleFontSize = function (action) {
        FontSize.toggle(action);
    };

    FontSize.check();

    function checkFontSize() {
        this.updateView();
    }

    function getFontSizeState() {
        return sessionStorage.getItem(this.storage)
            ? sessionStorage.getItem(this.storage)
            : 100;
    }

    function setFontSizeState(state) {
        sessionStorage.setItem(this.storage, "" + state);
        this.currentState = state;
        this.updateView();
    }

    function updateViewFontSize() {
        if (this.currentState === null) this.currentState = this.getState();

        this.currentState
            ? (html.style.fontSize = (this.currentState / 100) * htmlFontSize + "px")
            : "";

        this.currentState
            ? body.classList.add(this.cssClass + this.currentState)
            : "";
    }

    function toggleFontSize(action) {
        switch (action) {
            case "incFont":
                if (parseFloat(this.currentState) < 200) {
                    body.classList.remove(this.cssClass + this.currentState);
                    this.setState(parseFloat(this.currentState) + 20);
                } else {
                    alert("Font size limit reached!");
                }
                break;
            case "oriFont":
                body.classList.remove(this.cssClass + this.currentState);
                this.setState(100);
                break;
            case "decFont":
                if (parseFloat(this.currentState) > 40) {
                    body.classList.remove(this.cssClass + this.currentState);
                    this.setState(parseFloat(this.currentState) - 20);
                } else {
                    alert("Font size limit reached!");
                }
                break;
            default:
                break;
        }
    }

})();
