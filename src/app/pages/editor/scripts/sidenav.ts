import IconButton from "../CustomHtmlElements/IconButton";
import AddElementMenu from "../CustomHtmlElements/Menus/AddElementMenu";
import SidenavMenu from "../CustomHtmlElements/Menus/Menu";
import appendCustomHtmlElement from "../util/appendCustomHtmlElement";

const createSidenav = (): void => {
    interface SidenavButton {
        svgSrc: string;
        menu: SidenavMenu;
        container?: HTMLDivElement;
        isToggled?: boolean;
    }

    const sidenav = document.getElementById("sidenav");
    const main = document.getElementsByTagName("main").item(0);
    const preview = document.getElementById("preview");

    const addElementMenu = new AddElementMenu();
    main.insertBefore(addElementMenu.htmlElement, preview);

    const sidenavButtons: SidenavButton[] = [
        {
            svgSrc: "./icons/Plus.svg",
            menu: addElementMenu,
        },
        {
            svgSrc: "./icons/Alert.svg",
            menu: new SidenavMenu("Menu"),
        },
        {
            svgSrc: "./icons/Layers.svg",
            menu: new SidenavMenu("Menu"),
        },
        {
            svgSrc: "./icons/Page.svg",
            menu: new SidenavMenu("Menu"),
        },
    ]

    const closeAllSidenavMenus = () => {
        sidenavButtons.forEach((sidenavButton, idx) => {
            sidenavButton.container.style.backgroundColor = "#404040";
            sidenavButton.menu.close();
            sidenavButtons[idx].isToggled = false;
        })
    }

    const toggleSidenavButton = (buttonIndex: number) => {
        const sidenavButton = sidenavButtons[buttonIndex];
        if (sidenavButton.isToggled) {
            sidenavButton.container.style.backgroundColor = "#404040";
            sidenavButton.menu.close();
        } else {
            closeAllSidenavMenus();
            sidenavButton.container.style.backgroundColor = "#4D4D4D";
            sidenavButton.menu.open();
        }

        sidenavButtons[buttonIndex].isToggled = !sidenavButtons[buttonIndex].isToggled;
    }

    sidenavButtons.forEach((sidenavButton, idx) => {
        const buttonContainer = document.createElement("div");
        sidenavButtons[idx].container = buttonContainer;
        sidenavButtons[idx].isToggled = false;
        buttonContainer.className = "sidenav-button-container";

        const button = new IconButton(sidenavButton.svgSrc);
        appendCustomHtmlElement(buttonContainer, button);

        // Figure out how to change image fill on hover
        // buttonContainer.addEventListener("mouseenter", () => {
        //     button.element.style.fill = "#ECECEC";
        // })

        // buttonContainer.addEventListener("mouseleave", () => {
        //     button.element.style.fill = "#D0D0D0";
        // })

        buttonContainer.addEventListener("click", () => toggleSidenavButton(idx));
        sidenavButton.menu.htmlElement.addEventListener("close", () => toggleSidenavButton(idx));

        sidenav.appendChild(buttonContainer);
    })
}

export default createSidenav;