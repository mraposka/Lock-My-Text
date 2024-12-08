# Lock My Text [Lock URL](http://3.142.225.66:3000/lock.html) - [Unlock URL](http://3.142.225.66:3000/unlock.html)

**Lock My Text**, dosyalarınızı AES-256-CTR algoritması ile şifreleyip şifrelerini çözebileceğiniz basit bir Node.js uygulamasıdır. Uygulama bir Docker konteyneri olarak çalıştırılabilir.

---

## Özellikler

- **Dosya Şifreleme**: Belirtilen bir şifre ile dosyaları şifreler ve `.enc` uzantılı bir dosya oluşturur.
- **Şifre Çözme**: Şifrelenmiş dosyaları (`.enc`) çözerek orijinal dosyayı geri getirir.
- **Web Arayüzü**: Şifreleme ve çözme işlemleri için basit bir HTML form arayüzü sağlar.
- **Database**: Log kayıtları tutarak sorun yaratabilecek dosyaların tarihini ve yükleyen kişinin IP'sini yakalayarak yasal işlem başlatılabilir veya IP ban atılabilir.

---

## Gereksinimler

- [Docker](https://www.docker.com/) yüklü olmalıdır.
- [Docker-Compose](https://stackoverflow.com/questions/63708035/installing-docker-compose-on-amazon-ec2-linux-2-9kb-docker-compose-file) yüklü olmalıdır.

---

## Kurulum

1. **Projeyi Kopyalayın**:
   ```bash
   git clone https://github.com/mraposka/Lock-My-Text.git
   cd Lock-My-Text
   ```

2. **Docker İmajını Oluşturun**:
   ```bash
   docker-compose build
   ```

3. **Gerekli Dizinleri Oluşturun**: Şifreleme ve çözme işlemleri için konteynerin bu dizinlere erişmesi gereklidir.
   ```bash
   docker-compose up -d
   ```
---

## Kullanım

### 1. Web Arayüzüne Erişim
Konteyner çalıştıktan sonra, tarayıcınızdan şu adreslere erişebilirsiniz:

- **Dosya Şifreleme**: [http://IPADDRESS:3000/lock.html](http://IPADDRESS/lock.html)
- **Şifre Çözme**: [http://IPADDRESS:3000/unlock.html](http://IPADDRESS/unlock.html)

### 2. Şifreleme
1. **http://IPADDRESS/lock.html** adresine gidin.
2. Şifrelemek istediğiniz dosyayı seçin.
3. Bir şifre girin.
4. "Şifrele" butonuna tıklayın.
5. Şifrelenmiş dosya `.enc` uzantısı ile indirilir.

### 3. Şifre Çözme
1. **http://IPADDRESS/unlock.html** adresine gidin.
2. Şifrelenmiş dosyayı (.enc) seçin.
3. Dosyanın şifresini girin.
4. "Şifreyi Çöz" butonuna tıklayın.
5. Şifre çözülmüş dosya indirilir.

---

## Teknik Detaylar

### Dockerfile
Bu proje bir Docker konteyneri olarak çalıştırılmak üzere yapılandırılmıştır. Dockerfile, uygulamayı Node.js ortamında çalıştırır ve gerekli bağımlılıkları yükler.

### Uygulama Akışı
1. Kullanıcı bir dosya yükler.
2. Dosya **`uploads`** klasörüne kaydedilir.
3. Dosya, AES-256-CTR algoritması ile şifrelenir veya şifresi çözülür.
4. İşlem tamamlandığında dosya indirilir ve geçici dosya otomatik olarak silinir.

---

## Sorun Giderme

### Hata: `ENOENT: no such file or directory`
Bu hata, gerekli klasörlerin bulunmamasından kaynaklanır. Konteynerin doğru dizinlere bağlandığından emin olun:
```bash
mkdir -p /path/to/host/uploads /path/to/host/encrypted /path/to/host/decrypted
```

### Hata: `Conflict. The container name "/lock-my-text-container" is already in use`
Konteyner adı zaten kullanılıyorsa mevcut konteyneri durdurup silin:
```bash
docker stop lock-my-text-container
docker rm lock-my-text-container
```

### Hatırlatma: Sunucunuzun 3000 ve 3306 portlarını TCP protokolü için açık hale getirmeyi unutmayın. Tercihen compose dosyasından bu portları ve mysql kullanıcı bilgilerini değiştirebilirsiniz:

---

## Katkıda Bulunma
1. Bu projeyi fork'layın.
2. Yeni bir özellik dalı oluşturun (`git checkout -b yeni-ozellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni bir özellik ekle'`).
4. Dalınızı push edin (`git push origin yeni-ozellik`).
5. Pull request açın.

---

**İyi şifrelemeler! 🚀**
