import React, { useState } from "react";
import { supabase } from "../supabase/supabaseConfig"; 
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Addimgs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [description, setDescription] = useState(""); 
  const [loading, setLoading] = useState(false);
  let { user } = useSelector((state) => state.user);

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

    if (!description.trim()) {
      alert("Iltimos, tavsif yozing");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${selectedFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("imgs")
      .upload(fileName, selectedFile);

    if (uploadError) {
      console.error("Yuklashda xatolik:", uploadError.message);
      toast.error("Yuklashda xatolik yuz berdi !");
      setLoading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("imgs").getPublicUrl(fileName);

    setImgUrl(publicUrl);

    const { error: insertError } = await supabase
      .from("imgs")
      .insert([
        { img: publicUrl, category: description, userName: user.email },
      ]); 

    if (insertError) {
      console.error("DBga yozishda xatolik:", insertError.message);
      alert("Jadvalga yozishda xatolik yuz berdi.");
    } else {
      toast.success("Rasm va tavsif muvaffaqiyatli yuklandi!");
    }

    setSelectedFile(null);
    setDescription(""); 
    setLoading(false);
  };

  return (
    <div>
      <h2>Rasm Yuklash</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <textarea
        placeholder="Rasm tavsifi..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        cols={50}
      />
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Yuklanmoqda..." : "Yuborish"}
      </button>

      {imgUrl && (
        <div>
          <p>Yuklangan rasm:</p>
          <img src={imgUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default Addimgs;
