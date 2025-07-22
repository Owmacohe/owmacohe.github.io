// Put favicon on all pages

// Create dark mode icon
let link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
    link.media = "(prefers-color-scheme: dark)"
}
link.sizes = "16x16";
link.href = "images/logos/favicon/mfa-a-icon-white.png";

// Create light mode icon
let linkLight = document.createElement("link");
linkLight.rel = "icon";
document.getElementsByTagName("head")[0].appendChild(linkLight);
linkLight.media = "(prefers-color-scheme: light)"

linkLight.sizes = "16x16";
linkLight.href = "images/logos/favicon/mfa-a-icon-black.png";
