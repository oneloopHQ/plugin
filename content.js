function makeElementDraggable(element, container) {
    let posY = 0, posX = 0;
    let mouseDown = false;
    element.addEventListener("mousedown", dragMouseDown)
    element.addEventListener("mouseup", closeDragElement)

    function dragMouseDown(e) {
        mouseDown = true
        e = e || window.event;
        e.preventDefault();

        window.addEventListener("mousemove", elementDrag)
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        posX = e.clientX;
        posY = e.clientY;

        element.style.top = (posY - 10) + "px";
        element.style.left = (posX - 10) + "px";
    }

    function closeDragElement() {
        mouseDown = false
        window.removeEventListener("mousemove", elementDrag)
    }
}


function injectHTML(filename) {
    fetch(chrome.runtime.getURL(filename))
        .then(response => response.text())
        .then(html => {
            const container = document.createElement('div');
            container.innerHTML = html;

            document.body.appendChild(container);

            const closeButton = container.querySelector('#close-button');


            const actionButton = container.querySelector(".action-float-button")
            const oneloop = container.querySelector("#oneloop-window")
            if (actionButton) {
                actionButton.addEventListener("click", () => {
                    oneloop.style.display = "block"
                })
                makeElementDraggable(actionButton, container);
            }
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    // container.remove();
                    oneloop.style.display = 'none';
                });
            }
        })
        .catch(err => console.warn('Error fetching HTML:', err));
}

function createFloatingWindow() {
    if (document.getElementById('floating-window')) return;

    injectHTML('floating.html');

}

function injectCSS(filename) {
    var link = document.createElement("link");
    link.href = chrome.runtime.getURL(filename);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

injectCSS('styles.css');
createFloatingWindow();
