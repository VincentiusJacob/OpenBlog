document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("img");
    const previewimg = document.getElementById("previewImg");

    img.addEventListener("change", () => {
        const file = img.files[0];
        if(file) {
            const reader = new FileReader
            reader.onload = function () {
                previewimg.style.display = "block";
                previewimg.src = reader.result
            }
            reader.readAsDataURL(file);
        }else {
            previewimg.style.display = "none";
        }
        
    })
})
