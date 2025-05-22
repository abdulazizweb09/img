import React, { useState } from "react";
import { supabase } from "../supabase/supabaseConfig"; // Supabase konfiguratsiyasi

function Addimgs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Iltimos, rasm tanlang");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${selectedFile.name}`;

    // 1. Faylni Supabase Storage'ga yuklash
    const { error: uploadError } = await supabase.storage
      .from("imgs") // BUCKET nomi — to‘g‘ri kiriting
      .upload(fileName, selectedFile);

    if (uploadError) {
      console.error("Yuklashda xatolik:", uploadError.message);
      alert("Yuklashda xatolik yuz berdi.");
      setLoading(false);
      return;
    }

    // 2. Public URL olish
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("imgs") // Bu ham ayni bucket nomi bo‘lishi kerak
      .getPublicUrl(fileName);

    setImgUrl(publicUrl);

    // 3. Jadvalga yozish
    const { error: insertError } = await supabase
      .from("imgs") // Bu — sizning jadval nomingiz
      .insert([{ img: publicUrl }]);

    if (insertError) {
      console.error("DBga yozishda xatolik:", insertError.message);
      alert("Jadvalga yozishda xatolik yuz berdi.");
    } else {
      alert("Rasm muvaffaqiyatli yuklandi va saqlandi!");
    }

    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <div>
      <h2>Rasm Yuklash</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Yuklanmoqda..." : "Send"}
      </button>

      {imgUrl && (
        <div>
          <p>Yuklangan rasm:</p>
          <img src={imgUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
}

export default Addimgs;
