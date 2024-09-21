import { useContext, createContext, useState, useEffect, useRef } from "react";
import Cookie from "cookie-universal";
import { instance } from "../Api/axios";

const cookie = Cookie();
const token = cookie.get("token");
const Variabels = createContext<any>(null);

export default function VariabelsProvider({ children }: any) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [opensidebar, setopensidebar] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [shortmenue, setshortmenue] = useState(false);
  const [messageunread, setmessageunread] = useState(false);
  const [globalamount, setglobalamount] = useState("");
  const [currentuser, setcurrentuser] = useState<any>(null);
  const [maincard, setmaincard] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedMainCard = localStorage.getItem("maincard");
      return savedMainCard ? JSON.parse(savedMainCard) : [];
    }
    return [];
  });

  // Fetch the current user data
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await instance.get("/user");
        setcurrentuser(res.data);
      } catch (error: any) {
        if (error.response.status == 401) {
          if (cookie.get("token")) {
            cookie.remove("token");
          }
        } else {
          console.error("An unexpected error occurred", error);
        }
      }
    };
    getdata();
  }, []);

  // Load maincard from localStorage on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("maincard", JSON.stringify(maincard));
    }
  }, [maincard]);

  const id = currentuser?.data?.id || null;

  const startRecording = async () => {
    try {
      console.log("Recording started");

      // طلب الوصول إلى الميكروفون
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // التحقق من دعم الصيغة
      let options: MediaRecorderOptions = {};
      if (MediaRecorder.isTypeSupported("audio/webm")) {
        options = { mimeType: "audio/webm" };
      } else if (MediaRecorder.isTypeSupported("audio/mp3")) {
        options = { mimeType: "audio/mp3" };
      } else if (MediaRecorder.isTypeSupported("audio/wav")) {
        options = { mimeType: "audio/wav" };
      } else {
        console.warn("No supported audio MIME type found, using default.");
      }

      // إنشاء MediaRecorder مع الصيغة المدعومة أو الافتراضية
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = mediaRecorder;
      chunks.current = []; // إعادة تعيين المصفوفة قبل بدء التسجيل

      mediaRecorder.start();

      // تخزين البيانات الصوتية
      mediaRecorder.ondataavailable = (event) => {
        chunks.current.push(event.data);
      };

      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = () => {
    return new Promise<Blob>((resolve, reject) => {
      if (mediaRecorderRef.current) {
        // افتراضياً، أن عملية التسجيل تتم هنا ويتم إرجاع الـ Blob عند الإيقاف
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(chunks.current, { type: "audio/webm" });
          if (audioBlob) {
            resolve(audioBlob);
          } else {
            reject(new Error("No audio data available"));
          }
          chunks.current = []; // إعادة تعيين المصفوفة بعد الانتهاء
        };
        setIsRecording(false);
        mediaRecorderRef.current.stop(); // إيقاف التسجيل
      } else {
        reject(new Error("MediaRecorder is not initialized"));
      }
    });
  };

  useEffect(() => {
    const fetchConversations = async () => {
      if (id) {
        try {
          const res = await instance.get(
            `/users/${id}/${currentuser.type}/conversations`
          );
          const conversationData = res.data.data;

          // تحقق من وجود أي رسائل غير مقروءة
          const hasUnread = conversationData.some(
            (conversation: any) => conversation.hasUnreadMessages
          );

          await instance.post(`/conversations-read`);

          // إذا كانت هناك رسائل غير مقروءة، قم بتحديث setmessageunread
          if (hasUnread) {
            if (hasUnread !== messageunread) {
              setmessageunread(hasUnread);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchConversations();
  }, [id, messageunread, setmessageunread]);

  return (
    <Variabels.Provider
      value={{
        opensidebar,
        setopensidebar,
        token,
        currentuser,
        setcurrentuser,
        id,
        maincard,
        setmaincard,
        globalamount,
        setglobalamount,
        shortmenue,
        setshortmenue,
        startRecording,
        stopRecording,
        isRecording,
        messageunread,
        setmessageunread,
      }}
    >
      {children}
    </Variabels.Provider>
  );
}

export function UseVariabels() {
  return useContext(Variabels);
}
