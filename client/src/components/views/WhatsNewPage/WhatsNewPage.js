import React from "react";

function WhatsNewPage() {
    return (
        <div className="app">
            <article className="container whats-new">
                <h2 className="pt-3">אפשרויות שנוספו במערכת</h2>
                <h3>ה' חשוון תשפ"א</h3>
                <ul>
                    <li>נוספו גרפים לפי כיתה</li>
                </ul>
                <h3>ד' חשוון תשפ"א</h3>
                <ul>
                    <li>ניתן לראות אילו קבצים הועלו כבר</li>
                    <li>המערכת לא נותנת אפשרות להעלות קובץ שכבר הועלה, כדי למנוע כפילויות</li>
                </ul>
                <h3>ג' חשוון תשפ"א</h3>
                <ul>
                    <li>נוספו גרפים בדף הבית</li>
                </ul>
                <h3>ב' חשוון תשפ"א</h3>
                <ul>
                    <li>הצגת דוחות האזנה לפי שיעור, כיתה או שלוחות</li>
                    <li>הורדת הדוח בקובץ pdf</li>
                    <li>הורדת הדוח בקובץ אקסל</li>
                </ul>
                <h3>א' חשוון תשפ"א</h3>
                <ul>
                    <li>אפשרות לצפות ולעדכן את רשימת התלמידים</li>
                    <li>אפשרות לצפות ולעדכן את רשימת השלוחות</li>
                    <li>אפשרות לצפות בדוחות ההאזנה ולסנן אותם לפי כיתה, שיעור, תאריך ועוד</li>
                </ul>
            </article>
        </div>
    );
}

export default WhatsNewPage;
