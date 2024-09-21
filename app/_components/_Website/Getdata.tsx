export const getdata = async (endpoint: string) => {
  try {
    const response = await fetch(`https://alrajhost.com/api/${endpoint}`);
    const data = await response.json(); // تحويل الاستجابة إلى JSON
    return data;
  } catch (error) {
    console.log(error);
    return null; // إعادة قيمة فارغة في حال وجود خطأ
  }
};
