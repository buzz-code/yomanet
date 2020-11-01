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
                                        <td>חנוך מיוחד</td>
                                    </tr>
                                    <tr>
                                        <td>123467890</td>
                                        <td>לוי אסתר</td>
                                        <td>ט</td>
                                        <td>1</td>
                                        <td>מתמטיקה</td>
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
                            יבוא קבצי האזנה – מופיעה רשימת הקבצים – לחיצה כפולה על שם הקובץ תיבא את הקובץ
                            ל&quot;יומנט&quot;.
                        </p>
                    </li>
                    <li>
                        <p>
                            יבוא קבצי ועידה – לחיצה כפולה של שם התיקייה – התיקיה תפתח – לחיצה כפולה על שם הקובץ תיבא את
                            הקובץ ל&quot;יומנט&quot;.
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
                    התלמידים, השלוחות, שמות הקבצים שהועלו למערכת – לא ניתן כמובן לעלות קובץ פעמיים.
                </p>
                <p>
                    <div style={{ textDecoration: "underline", fontWeight: "bold", fontSize: "1.25rem" }}>
                        תפריט דוחות
                    </div>
                    פה ניתן להפיק בפורט אקסל או pdf כמעט כל מה שעולה בדעתכם.
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
                                <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    דוח זה מציג גם את התלמידות שלא שמעו כלל.
                                </div>
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
                <p className="pt-4">נשמח לעמוד בקשר בכל שאלה. </p>
            </article>
        </div>
    );
}

export default InstructionPage;
