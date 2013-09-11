<%@ Page Language="C#" ContentType="text/html" ResponseEncoding="utf-8" Debug="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
<%
try{
	string name = Request.Form["name"].ToString();
	string mail = Request.Form["mail"].ToString();
	string tel = Request.Form["tel"].ToString();
	string area = Request.Form["area"].ToString();
	string sex;
	
	if(string.IsNullOrEmpty(mail) || string.IsNullOrEmpty(tel) || string.IsNullOrEmpty(name) || string.IsNullOrEmpty(area)) {
%>
	<script>alert("請確定輸入相關資訊。");location.replace('index.html')</script>
<%		
	}else{		
		if(Request.Form["sex"].ToString()=="1")
			sex = "先生";
		else
			sex = "小姐";
		
		//using System.Net.Mail;	
		System.Net.Mail.SmtpClient mySmtp = new System.Net.Mail.SmtpClient("smtp.gmail.com",587);
		
		mySmtp.Credentials = new System.Net.NetworkCredential("帳號", "密碼");//	
		mySmtp.EnableSsl = true;//
		
		System.Net.Mail.MailMessage msgMail = new System.Net.Mail.MailMessage();
		msgMail.From = new System.Net.Mail.MailAddress(mail);
				
		msgMail.To.Add("收件者");
		
		
		msgMail.Subject = "松濤苑-預約看屋";
		String pcontect = "姓名 :" + name +" " + sex+"<br>"
						+ "國家/地區 : "+ area +"<br>"
						+ "聯絡電話 : " + tel +"<br>"
						+ "聯絡信箱 : " + mail +"<br>";
						
		
		//信件內容(含HTML時)
		System.Net.Mail.AlternateView alt = System.Net.Mail.AlternateView.CreateAlternateViewFromString(pcontect, null, "text/html");
		msgMail.AlternateViews.Add(alt);
		
		try{
			mySmtp.Send(msgMail);			
%>
			<script>alert('寄送成功。');location.replace('index.html')</script>
<%			
		}catch (System.Net.Mail.SmtpException ex){
				//Response.Write(ex);
%>
			<script>alert('請稍候再試。');location.replace('index.html')</script>
<%		
		}
	}
	
	
	
	
}catch(NullReferenceException e){
%>
<script>alert("請確定輸入相關資訊。");location.replace('index.html')</script>
<%
Response.End();		
}
%>
</body>
</html>
