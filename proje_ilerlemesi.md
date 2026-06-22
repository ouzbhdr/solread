# SolRead & SolJeton: Proje İlerlemesi ve Yol Haritası

Bu dosya, projenin mevcut durumunu, tamamlanan özellikleri ve gelecek hedeflerini (milestones) takip etmek amacıyla oluşturulmuştur.

---

## 🚀 Tamamlanan Çalışmalar (Completed)

1. **Zengin Metin Editörü (Medium-Style Rich Text Editor):**
   - `/write` sayfasında dikkat dağıtmayan, borderless başlık ve içerik alanları tasarlandı.
   - Kalın, italik, altı çizili yazma, başlık (H1, H2, H3) ekleme, blok alıntı (blockquote), sıralı/sırasız listeler ve özel tablolar ekleme yetenekleri eklendi.
   - Resim yükleme ve görsel ekleme desteği sağlandı.

2. **Dinamik HTML İçerik Renderlama:**
   - Editörden gelen zengin metin formatlarının `/articles/[id]` ve `/soljeton` sandbox önizlemesinde kusursuz stilize edilmesi için `globals.css` üzerinde özel Tailwind ve standart CSS kuralları (prose stilleri) yazıldı.
   - `dangerouslySetInnerHTML` kullanılarak HTML çıktısı güvenli ve şık bir şekilde yansıtıldı.

3. **SolJeton Widget & Sandbox Arayüzü:**
   - `/soljeton` sayfasındaki widget oluşturucu ekranı yeniden tasarlandı; kod snippet'i doğrudan başlığın altına taşınarak simetri sağlandı.
   - Widget oluşturma formu ile canlı önizleme kutusu yan yana (side-by-side) gelecek şekilde düzenlendi.
   - Paywall kod snippet'lerindeki cüzdan adresi `YOUR_WALLET_ADDRESS` placeholder'ı ile değiştirildi.
   - Footer alanındaki "Open Source" ibaresi kaldırıldı.

4. **Marka ve Logo Entegrasyonu:**
   - Masaüstünde bulunan `logo.png` dosyası projenin `/public` klasörüne taşındı.
   - Header bileşenindeki (`header.tsx`) ve ana sayfadaki (`page.tsx`) eski ikonlar yerine bu logo entegre edildi.

5. **Superteam Grant Başvurusu:**
   - Solana Foundation Turkey (Superteam Turkey) için 3000 USDG bütçeli hibe başvurusu tamamlandı.
   - Başvuru için One-Liner (150 karakter altı), Proje Detayları, KPI'lar ve tarihsiz Milestones yanıtları hazırlandı ve onaylandı.

---

## 🎯 Gelecek Dönüm Noktaları (Milestone Deliverables)

Proje onaylandığında sırasıyla tamamlanacak hedefler:

### Milestone 2: SPL Token (USDC) Desteği & Mainnet Geçişi (Planned)
* **Ödeme Katmanı:** `@solana/spl-token` kütüphanesini entegre ederek SOL dışındaki token'larla da (özellikle USDC) ödeme kabul edilmesi sağlanacak.
* **Doğrulama Katmanı:** API tarafında (`verify/route.ts`), yapılan işlemin belirtilen mint adresi (USDC) ve transfer miktarı ile eşleştiği zincir üzerinden doğrulanacak.
* **Canlıya Geçiş:** Tüm RPC bağlantısı Solana Mainnet ağına taşınacak.

### Milestone 3: Arweave Merkeziyetsiz Depolama (Planned)
* **Irys SDK Entegrasyonu:** `/write` sayfasında yazar "Yayınla" dediğinde, makale verisi (başlık, teaser, kilitli içerik) Irys SDK aracılığıyla kalıcı olarak Arweave ağına yüklenecek.
* **Veritabanı Bağımsızlığı:** Makaleler yerel hafızadan (localStorage) kurtarılıp doğrudan Arweave işlem kimliği (transaction hash) üzerinden çekilecek.

### Milestone 4: Creator SaaS Tasarım Paneli (Planned)
* **Görsel Düzenleyici:** Yaratıcıların kod yazmadan buton renkleri, neon efektleri, yazı tipleri ve paywall boyutlarını görsel bir panelden ayarlaması ve dinamik entegrasyon kodunu alabilmesi sağlanacak.
* **Dağıtım Kanalları:** Widget kodunu kolaylaştırmak için NPM paketi ve WordPress eklentisi yayınlanacak.

### Milestone 5: Topluluk Yönetimi & DAO Geçişi (Future)
* **DAO Yapısı:** Projenin gelir paylaşım ve yönetim yapısının topluluk kontrollü bir DAO (Merkeziyetsiz Otonom Organizasyon) modeline evrilmesi araştırılacak.
