(function() {
    const devtoolsDetector = {
        element: new Image(),
        detect() {
            console.log('%c ', this.getCssRule());
            console.clear();
            document.body.style.backgroundColor = 'black';
            document.documentElement.style.backgroundColor = 'black';        
            document.documentElement.innerHTML = '<h1 style="color:red;">:V NO ABRIR HERRAMIENTAS DE DESARROLLADOR  SE CONSCIENTE :V</h1>';
            setTimeout(() => {
                window.location.replace("https://www.google.com");
            }, 2000);
        },
        getCssRule() {
            return {
                width: '9999px',
                height: '9999px',
                'background-color': '#000000',
                'background-image': 'url(' + this.element.src + ')',
                'background-size': 'contain',
                'position': 'absolute',
                'left': '-100%',
                'top': '-100%'
            };
        },
        init() {
            Object.defineProperty(this.element, 'id', {
                get: this.detect.bind(this)
            });
            console.log(this.element);
        }
    };

    devtoolsDetector.init();

    function detectDevTools(openCallback, closeCallback) {
        const threshold = 160;
        let lastTime = (new Date()).getTime();

        function check() {
            const start = (new Date()).getTime();
            debugger;
            const end = (new Date()).getTime();
            if (end - start > threshold) {
                openCallback();
            } else {
                closeCallback();
            }
            lastTime = (new Date()).getTime();
            setTimeout(check, 1000);
        }
        setTimeout(check, 1000);
    }

    detectDevTools(
        () => {
            devtoolsDetector.detect();
            setTimeout(() => {
                window.location.replace("https://www.google.com");
            }, 2000);
        },
        () => console.clear()
    );
})();