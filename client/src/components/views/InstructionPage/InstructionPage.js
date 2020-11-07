import React from "react";

function InstructionPage() {
    return (
        <div className="app">
            <article className="container instruction">
                <h2 className="pt-3">הוראות שימוש</h2>
                <p> ברוכים הבאים למערכת "יומנט" היומן של בית הספר במרחב הקולי!!</p>
                <p>שלום רב!</p>
                <p>אז כיצד מתחילים בקלות ובמהירות??</p>
                <ol style={{ listStyleType: "hebrew" }}>
                    <li>
                        <p>הכנת קבצי הנתונים – נתוני התלמידות והשלוחות – בפורמט אקסל.</p>
                        <p>המאפין הראשון לכל תלמידה הוא הכיתה – שתופיע בעמודה C, ומס' הכיתה שיופיע בעמודה D</p>
                        <p>
                            המאפינים הבאים לכל תלמידה כגון הקבצה או מגמה – יופיעו בעמודה E כאשר בין אחד לשני מופיע פסיק.
                            אין להקליד מרכאת לדגו' הנהלת חשבונות – הנהח.
                        </p>
                        <p>
                            <table className="table table-sm table-bordered">
                                <thead>
                                    <tr style={{ backgroundColor: "#563d7c", color: "#ffffff" }}>
                                        <th>מס' זהוי</th>
                                        <th>שם התלמידה</th>
                                        <th>הכיתה</th>
                                        <th>מס' כיתה</th>
                                        <th>המגמה/התמחות (לא חובה)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123456789</td>
                                        <td> ביטון שרה</td>
                                        <td>ט</td>
                                        <td>1</td>
                                        <td>אנגלית א1, חשבון א2</td>
                                    </tr>
                                    <tr>
                                        <td>123467890</td>
                                        <td>לוי אסתר</td>
                                        <td>ט</td>
                                        <td>1</td>
                                        <td>מתמטיקה, יעוץ עסקי, הפעלה חברתית</td>
                                    </tr>
                                    <tr>
                                        <td>98765432</td>
                                        <td>כהן שרה</td>
                                        <td>י</td>
                                        <td>3</td>
                                        <td>חנוך מיוחד, חשבות שכר,הנהח</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>
                        <p>
                            <table className="table table-sm table-bordered">
                                <thead>
                                    <tr style={{ backgroundColor: "#563d7c", color: "#ffffff" }}>
                                        <th>מס' השלוחה</th>
                                        <th>שם השלוחה</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1/1/2/8</td>
                                        <td>ט1 דינים</td>
                                    </tr>
                                    <tr>
                                        <td>1/1/3/4</td>
                                        <td>ט1 מתמטיקה</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>
                    </li>
                    <li>
                        <p>
                            יבוא קבצי הנתונים לתוך המערכת - בתפריט העלאת קובץ – עדכון נתוני תלמידות/שיעורים – יש לבחור
                            את מיקום הקובץ.
                        </p>
                    </li>
                    <li>
                        <p>הורדת קבצי האזנה ממערכת הטלפונים</p>
                        <p>
                            בתפריט קבצי ימות המשיח מופיעה רשימת הקבצים, לחיצה כפולה על הקובץ הוא יטען למערכת היומנט.
                            ניתן להטעין גם קובץ של היום הנוכחי, בהטענה הבאה הקובץ המעודכן יעלה על הקובץ שהוטען.
                        </p>
                        <p>
                            הערה- חשוב וטוב לפעמים לטעון קובץ יומי מעודכן – ולדעת מי הקשיבה הבקר – כמו שאומרים "להכות
                            בברזל כשהוא חם"
                        </p>
                    </li>
                </ol>
                <h3 className="pt-3">ומה הלאה???</h3>
                <p>
                    <div style={{ textDecoration: "underline", fontWeight: "bold", fontSize: "1.25rem" }}>
                        תפריט נתונים
                    </div>
                    פה ניתן לראות מה נמצא במערכת
                    <br />
                    התלמידים, השלוחות, האזנת התלמידות- מפורטת. (כאשר יש שאלות על הדוחות – ניתן לענות בפרוטרוט על ההקשבה)
                    – ככל שהנתונים עדכניים ואמיניים – האזנה עולה פלאים.
                </p>
                <p>
                    <div style={{ textDecoration: "underline", fontWeight: "bold", fontSize: "1.25rem" }}>
                        תפריט דוחות
                    </div>
                    פה ניתן להפיק בפורמט אקסל , pdf או שליחה ישירות למייל כמעט כל מה שעולה בדעתכם. – כדאי לשחק בזה עד
                    שמגיעים לתוצרת שעונה על צרכי המורות וההנהלה.{" "}
                    <ol style={{ listStyleType: "hebrew" }}>
                        <li>
                            <p>
                                <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    נתוני האזנה לפי כיתה – שעורים
                                </div>
                                המערכת תציג את סך דקות האזנה של כל תלמידה בכל מקצוע שנבחר בטווח תאריכים.
                                <br />
                                ניתן לבחור כיתה אחת או מס' כיתות. שעור אחד או מספר שעורים.
                            </p>
                        </li>
                        <li>
                            <p>
                                <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    נתוני האזנה לפי כיתה ומקצוע
                                </div>
                                המערכת תציג נתוני האזנה במקצוע אחד בכל שיעור ושעור במקצוע, ניתן לבחור רק מקצוע אחד.
                            </p>
                        </li>
                        <li>
                            <p>
                                <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    דוח האזנה לפי כיתה – תלמידות
                                </div>
                                המערכת תציג את סך הדקות שכל תלמידה שמעה בטווח תאריכים.
                                <br />
                            </p>
                        </li>
                        <li>
                            <p>
                                <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    דוח האזנה לשעורי ועידה
                                </div>
                                יש לבחור את הכיתה וטווח תאריכים.
                            </p>
                        </li>
                    </ol>
                </p>
                <h4 className="pt-3">הדובדבן שבקצפת</h4>
                <p>
                    <div style={{ textDecoration: "underline", fontWeight: "bold", fontSize: "1.25rem" }}>
                        תפריט הגרפים
                    </div>
                    גרף – תמונה ברורה המציגה את האזנת התלמידות בטווח תאריכים.
                </p>
                <p>יש לבחור כיתה וטווח תאריכים</p>
                <p className="pt-4">נשמח לעמוד בקשר בכל שאלה. </p>
            </article>
        </div>
    );
}

export default InstructionPage;
