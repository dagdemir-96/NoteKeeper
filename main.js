//ay dizisi
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


//html den js eleman çekme dokument.querySelector ile getElemntByid,getElementByClass gibi özelliklerle de elemen çekilebiliyor.dokument.querySelector ile hem id hem de class çekilebiliyor. sadece id yada class çekmek isteseydik getElemntByid,getElemntByclass çzelliği ile çekmiş olacktık. class çağıdığımızda . ve id ile çağırdığımızda # eklememiz gerekiyor.

const addBox = document.querySelector(".add-box");
const popupContainer = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector("#close-btn");
const form = document.querySelector("form");
const wrapper=document.querySelector(".wrapper")
const popupTitle = document.querySelector("header h1");
const submitBtn = document.querySelector("form button");


//! localStorage dan notes key ine sahip elemanları al.Eğer localStorage boş ise bunu bir dizi olara belirle
let notes = JSON.parse(localStorage.getItem("notes")) || [];
//! gÜNCELLEME İŞLEMİ İÇİN GLOBAL DEĞİŞKENLER OLUŞTUR
let isUpdate = false;
let updateId = null;

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
//formun gönderilmesi izlenir
form.addEventListener("submit", (e) => {
  //formun yenilenmesini engelleme
  e.preventDefault();//

  //form içerisindeki input ve textare değerlerine erişme ve trim medtodu ile dtring ifadelerin başındaki ve sonundaki boşlukları kaldırma
  const title = e.target[0].value.trim();
  const description = e.target[1].value.trim();

  //eğer title ve description kısımları boş ise kullanıcıya uyarı ver
  if (!title || !description) {
    alert('title ve description alanalrı boş geçilemez');
    //return fonksiyonlarda hem değer döndürme hem de sonlandırma yani kendisinden sonra gelen kodu çalıştırmama özelliğine sahiptir. Koşullu yapılarda ise sadece bir fonksiyon içinde ise sonlandırma işlevi görür. fonksiyon dışında çalışmaz
    return;
  }
  //tarih oluşturma
  const date = new Date();
  //uniq id tarih verisi oluşturma getTime medtodu ile oluşturulur
  const id = date.getTime();
  const day = date.getDate();
  const month = date.getMonth();
  const updateMonth = months[month];//months olarak oluştuurlan ay dizisinin içinden monthh yani ayı çekilecek
  const year = date.getFullYear();


  //eğer ki form güncelleme modunda ise 
  if(isUpdate){
    //güncelleme yapılacak note dizisi içerisinde bul
const findIndex = notes.findIndex((note) => note.id == updateId);


    //bulunan elamanı güncelle
    notes[findIndex]={
      title,
      description,
      id,
      date:`${updateMonth} ${day}, ${year}`,
    };
    // Popup'ı ve Form'u eski haline getir
    isUpdate = false;
    updateId = null;

    popupTitle.textContent = "New Note";
    submitBtn.textContent = "Add Note";

    //formu eski haline getir.
 } else {
    // Tarih verisi oluştur
    let noteItem = {
      title,
      description,
      id,
      date: `${updateMonth} ${day},${year}`,
    };
};

  //tarih verisi içinde  birden fazla tip barından obje ile oluşturuldu
 
  //oluşturulan note objesini  notes obejesine ekle
  notes.push(noteItem)
  //elde edilen note elemanını locStorage'e kayıt et
  localStorage.setItem("notes", JSON.stringify(notes));
  //! GİRLEN NOTLARI DEPOLAYAMADIM, HATAYI GÖREMEDİM

  //Formu temizleme,notu girikten sonra yazdıkalrımızın zilinip yeni note eklemeye hazır olması
  e.target.reset();


  //popup ı kapat,not eklendikten sonra açılan not popup ını kapatma
  popupContainer.classList.remove("show");
  popup.classList.remove("show");

  //notları render et
  renderNotes(notes);

});

//notları arayüze render edecek fonksiyon
function renderNotes(notes){
  //notes dizisindeki her eleman için birer note elamanını arayüze renderlar 

//bir html elemanını arayüzden kaldırmak için remove metodu kullanılır.

  //mevcut note elemanlarını kaldır
  document.querySelectorAll(".note").forEach((item)=> item.remove());
  //notes dizisindeki her elemanı dön




  notes.forEach((note) => {
    //notes dizisindeki her eleman için html oluştur
    let noteHTML=`     <li class="note" data-id='${note.id}'>
   
        <div class="details">
          <h2 class="title">${note.title}</h2>
          <p class="description">${note.description}</p>
        </div>


        <div class="bottom">
          <span id="date">${note.date}</span>

          <div class="settings">
            <i class="bx bx-dots-horizontal-rounded"></i>

            <ul class="menu">
              <li class="edit-btn"><i class="bx bx-edit"></i> Düzenle</li>
              <li class="delete-btn"><i class="bx bx-trash-alt"></i> Sil</li>
            </ul>
          </div>
        </div>
      </li>`;

      addBox.insertAdjacentHTML("afterend",noteHTML)

 
  });
}
//menü kımının görünürlüğü
function showMenu(eleman){
  //html elemanının kapsayıcısına erişmek için parentElement medtodu kullanılır
  eleman.parentElement.classList.add("show");
  //eklenen show classının üç nokta haricinde bir yere tıklandıysa kaldır
document.addEventListener("click",(e)=> {
  //tıklana eleman üç nokta değilse ve kapsam dışındaysa
  if(e.target.tagName!="I" || e.target !=eleman ){
    eleman.parentElement.classList.remove("show");
  }

})
}
//wrapper kısındaki izlenme olayları
wrapper.addEventListener("click", (e)=> {
  //tıklanılan eleman üç nokta mı?
  if(e.target.classList.contains("bx-dots-horizontal-rounded")){
    showMenu(e.target);

  }
  //eğer sil butonuna tıklandıysa
  else if(e.target.classList.contains("delete-btn")){
    //kullanıcıdan silme işlmei onayı al
   const response= confirm("Bu notu silmek istediğinize emin misiniz?");
   console.log(response);


    //eğer kullanıcı silme işemini onayladıysa 
    if(response){
     //tıklanılan not elamanını  ilk olarak note dizisinden kaldır sonra localStoage'den kaldır


     //bir elemanı kpasayıcısna erişmek için parentElement medodunu kullanırız fakat kapsam sayısı arttıkça bu erişme işlemi biraz daha zor oluyor. Bunun için de closest metodu ile daha kolay erişebiliriz. closest metodu erişilmek istnen elemanın spesifik bir özelliği belirtildiğinde istenilen elemana erişmemizi sağlar
          //  e.target.parentElement.parentElement.parentElement.parentElement yerine 
          //tıklanan elemanın kapsayıcısı olannote elemanına eriş
          const note=e.target.closest(".note");
          

          //erişilen elemanın id sine eriş
          const noteId=parseInt(note.dataset.id);

          //id si bilinen elemanı notes dizisiden kaldır
      notes = notes.filter((note) => note.id !=noteId);

      //localSroage i güncelle
      localStorage.setItem("notes", JSON.stringify(notes));

      //notları render et
      renderNotes(notes);
    }
  }
   // Eğer düzenle butonuna tıklandıysa
  else if (e.target.classList.contains("edit-btn")) {
    // Tıklanılan note elemanının kapsayıcı olan note'a eriş
    const note = e.target.closest(".note");
    // Erişilen elemanın id'sini al
    const noteId = Number(note.dataset.id);
    // Id'si bilinen note elemanını notes dizisi içerisinde bul
    const foundedNote = notes.find((note) => note.id == noteId);

   // Popup'ı aç
    popupContainer.classList.add("show");
    popup.classList.add("show");

    //popup içerisindeki input ve textarea elemanının değerlerini güncellenecek elemanın değerlerine atama yap

    form[0].value=foundedNote.title;
    forö[1].value=foundedNote.description;

    //formun güncelleme moduna sokacak değeişkenlere atama yap
    isUpdate=true;
    updateId=noteId;

     // Popup'ı güncelleme için düzenle
    popupTitle.textContent = "Update Item";
    submitBtn.textContent = "Update";
  }

});
document.addEventListener("DOMContentLoaded",renderNotes(notes));

//!GÜNCELLEME KISMINDA İLK YAZILAN NOTUN GELMEMESİ VE YENİ OTUN EKLENEMEMESİ HATALARI ALINDI , KONTROL EDİLECEK