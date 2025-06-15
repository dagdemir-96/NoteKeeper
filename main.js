//html den js eleman çekme dokument.querySelector ile getElemntByid,getElementByClass gibi özelliklerle de elemen çekilebiliyor.dokument.querySelector ile hem id hem de class çekilebiliyor. sadece id yada class çekmek isteseydik getElemntByid,getElemntByclass çzelliği ile çekmiş olacktık. class çağıdığımızda . ve id ile çağırdığımızda # eklememiz gerekiyor.

const addBox = document.querySelector(".add-box");
const popupContainer = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector("#close-btn");
const form = document.querySelector("form");

console.log(form);

//tıkalnam ,sürekleme, formül gönderme kısaca izleme olayını takip etmek için addEventListener() kullanılır.
addBox.addEventListener("click", () => {
  //popup ı aktif etmek için :popupContainer ve popup elemanlarına class ı eklenmelidir.
  //class nasıl eklenir:popupContainer.classList.add(eklenecek clas)
  popupContainer.classList.add("show");
  popup.classList.add("show");

  //not ekrlerken arka planın sabit kalması için body alanına erşmemizgerekiyor.yani body nin kaydırımasını engelle
  document.body.style.overflow = "hidden";
});
//closeBtn ile eleman tıklandığını olay izleyicisi ekleyeyerek x dan çıkmay sağlayacak. bunun için de yukarıda eklediğimiz olay izleyicilerini remove ile eklenenşeri kaldırmışş olacağız
closeBtn.addEventListener("click", () => {
  popupContainer.classList.remove("show");
  popup.classList.remove("show");

  //body nin tekrar aktif edilmesi için
  document.body.style.overflow = "auto";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("merhaba");
});
