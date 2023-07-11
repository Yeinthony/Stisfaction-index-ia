import { useEffect, useState } from "react";

//Dependencies
import {Document, Image, PDFViewer, Page, Text, View} from "@react-pdf/renderer";
import { DateTime } from 'luxon';

//Components
import { Sidebar } from "../../../components/Sidebar";
import { Navbar } from "../../../components/Navbar"; 
import { TablesDetectionsPDF } from "../../../components/TableDetectionsPDF";
import { SecondarySpinner } from "../../../components/SecondarySpinner";

//Others
import { Unfold } from "../../../helpers/Unfold"; 
import { getDaysMonths } from "../../../helpers/GetDaysMonths";
import { getExpressionsForMonth } from '../../../api/expressions.api';
import { getGendersForMonth } from '../../../api/genders.api';
import { getAgesForMonth } from '../../../api/ages.api';
import { 
    averagePorcentageExpressions, 
    averagePorcentageGenders, 
    averagePorcentageAges 
} from "../../../helpers/AveragePorcentange";
import logo from "../../../assets/img/logos/expressionsIA2.png";


export function ShowPDFMonth() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const organization = localStorage.getItem('organization');
    const today = new Date();
    const token = sessionStorage.getItem('token');
    const res = getDaysMonths();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    const daysInTheMonth = [];

    const daysMonth = DateTime.local(today.getFullYear(), today.getMonth()).daysInMonth;

    for (let i = 1; i < daysMonth; i++) { daysInTheMonth.push(i) }

    useEffect(() => {

        const expressionsMonth = async() =>{
            const record = await getExpressionsForMonth(token, month+1, year);

            const expressionsOfTheMonth = [];

            //Load genderOfTheMonth with the days of the month
            for (let i = 1; i < daysMonth; i++) { 
                expressionsOfTheMonth.push([]);
                //Load gendersOfTheMonth with the records
                record.data.forEach(el => {
                    if(i === el.day) expressionsOfTheMonth[i-1].push(el) 
                });
            }

            let count = 0;
            expressionsOfTheMonth.forEach(el => {
                expressionsOfTheMonth[count] = averagePorcentageExpressions(el);
                count += 1;
            });

            setExpressions(expressionsOfTheMonth);
        }

        const gendersMonth = async() =>{

            const record = await getGendersForMonth(token, month+1, year);  
            const gendersOfTheMonth = [];

            //Load genderOfTheMonth with the days of the month
            for (let i = 1; i < daysMonth; i++) { 
                gendersOfTheMonth.push([]);
                //Load gendersOfTheMonth with the records
                record.data.forEach(el => {
                    if(i === el.day) gendersOfTheMonth[i-1].push(el) 
                });
            }

            let count = 0;
            gendersOfTheMonth.forEach(el => {
                gendersOfTheMonth[count] = averagePorcentageGenders(el);
                count += 1;
            });

            setGenders(gendersOfTheMonth);
        }

        const agesMonth = async() =>{
            const record = await getAgesForMonth(token, month+1, year);

            const agesOfTheMonth = [];

            //Load agesOfTheMonth with the days of the month
            for (let i = 1; i < daysMonth; i++) { 
                agesOfTheMonth.push([]);
                //Load agesOfTheMonth with the records
                record.data.forEach(el => {
                    if(i === el.day) agesOfTheMonth[i-1].push(el) 
                });
            }

            let count = 0;
            agesOfTheMonth.forEach(el => {
                agesOfTheMonth[count] = averagePorcentageAges(el);
                count += 1;
            });

            setAges(agesOfTheMonth);
        }

        expressionsMonth();
        gendersMonth();
        agesMonth();

    }, []);
    
    return (
        
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            {expressions && genders && ages ?
                <PDFViewer className="showPDF">
                    <Document>
                        <Page size="A4">
                            <View style={{paddingTop:"75px", paddingLeft:"75px", paddingBottom:"50px", paddingRight:"50px"}}>
                                <View>
                                    <View style={{display: "flex"}}>
                                        <View style={{marginTop:"5px"}}>
                                            <Text style={{fontSize:"13px"}}>E X P R E S S I O N S  .I A</Text>
                                            <Text style={{fontSize:"33px", fontWeight:"extrabold", marginTop:"5px"}}>REPORTE MENSUAL</Text>
                                        </View>
                                        <Image style={{ width:"70px", position:"absolute", right:"0" }} src={logo} alt="user photo" id="img-user"/>
                                    </View>
                                    <View style={{marginTop:"55px", position:"relative"}}>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"relative", width:"250px"}}>
                                            <Text style={{width:"90px", fontSize:"13px"}}>NOMBRE:</Text>
                                            <Text style={{width:"160px", fontSize:"13px", position:"absolute", right:"0", top:"8px", textTransform:"uppercase"}}>{name}</Text>
                                        </View>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"absolute", width:"180px", right:"0"}}>
                                            <Text style={{width:"70px", fontSize:"13px"}}>FECHA:</Text>
                                            <Text style={{width:"110px", fontSize:"13px", textTransform:"uppercase", position:"absolute", right:"0", top:"8px"}}>{`${res.months[month]} de ${year}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{backgroundColor:"#ededed", padding:"8px", marginTop:"20px", position:"relative", width:"350px"}}>
                                        <Text style={{width:"130px", fontSize:"13px"}}>ORGANIZACION:</Text>
                                        <Text style={{width:"220px", fontSize:"13px", position:"absolute", right:"0", top:"8px", textTransform:"uppercase"}}>{organization}</Text>
                                    </View>
                                    <View style={{marginTop:"130px"}}>
                                        <View style={{left:"0", right:"0"}}>
                                            <Text style={{textAlign:"center", fontSize:"22"}}>DETALLES DE LAS DETECCIONES</Text>
                                        </View>
        
                                        {expressions && genders && ages ? 
                                            <>
                                                <View style={{marginTop:"40px", marginBottom:"140px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`1 de ${res.months[month]}`}
                                                        expressions={expressions[0]}
                                                        genders={genders[0]}
                                                        ages={ages[0]} 
                                                    /> 
                                                </View> 
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`2 de ${res.months[month]}`}
                                                        expressions={expressions[1]}
                                                        genders={genders[1]}
                                                        ages={ages[1]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`3 de ${res.months[month]}`}
                                                        expressions={expressions[2]}
                                                        genders={genders[2]}
                                                        ages={ages[2]} 
                                                    /> 
                                                </View>
                                                <View style={{marginBottom:"25px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`4 de ${res.months[month]}`}
                                                        expressions={expressions[3]}
                                                        genders={genders[3]}
                                                        ages={ages[3]} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"5px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`5 de ${res.months[month]}`}
                                                        expressions={expressions[4]}
                                                        genders={genders[4]}
                                                        ages={ages[4]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`6 de ${res.months[month]}`}
                                                        expressions={expressions[5]}
                                                        genders={genders[5]}
                                                        ages={ages[5]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`7 de ${res.months[month]}`}
                                                        expressions={expressions[6]}
                                                        genders={genders[6]}
                                                        ages={ages[6]} 
                                                    />
                                                </View> 
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`8 de ${res.months[month]}`}
                                                        expressions={expressions[7]}
                                                        genders={genders[7]}
                                                        ages={ages[7]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`9 de ${res.months[month]}`}
                                                        expressions={expressions[8]}
                                                        genders={genders[8]}
                                                        ages={ages[8]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`10 de ${res.months[month]}`}
                                                        expressions={expressions[9]}
                                                        genders={genders[9]}
                                                        ages={ages[9]} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`11 de ${res.months[month]}`}
                                                        expressions={expressions[10]}
                                                        genders={genders[10]}
                                                        ages={ages[10]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`12 de ${res.months[month]}`}
                                                        expressions={expressions[11]}
                                                        genders={genders[11]}
                                                        ages={ages[11]} 
                                                    />
                                                </View> 
                                                <View style={{marginBottom:"140px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`13 de ${res.months[month]}`}
                                                        expressions={expressions[12]}
                                                        genders={genders[12]}
                                                        ages={ages[12]} 
                                                    /> 
                                                </View> 
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`14 de ${res.months[month]}`}
                                                        expressions={expressions[13]}
                                                        genders={genders[13]}
                                                        ages={ages[13]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`15 de ${res.months[month]}`}
                                                        expressions={expressions[14]}
                                                        genders={genders[14]}
                                                        ages={ages[14]} 
                                                    /> 
                                                </View>
                                                <View style={{marginBottom:"25px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`16 de ${res.months[month]}`}
                                                        expressions={expressions[15]}
                                                        genders={genders[15]}
                                                        ages={ages[15]} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"5px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`17 de ${res.months[month]}`}
                                                        expressions={expressions[16]}
                                                        genders={genders[16]}
                                                        ages={ages[16]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`18 de ${res.months[month]}`}
                                                        expressions={expressions[17]}
                                                        genders={genders[17]}
                                                        ages={ages[17]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`19 de ${res.months[month]}`}
                                                        expressions={expressions[18]}
                                                        genders={genders[18]}
                                                        ages={ages[18]} 
                                                    />
                                                </View> 
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`20 de ${res.months[month]}`}
                                                        expressions={expressions[19]}
                                                        genders={genders[19]}
                                                        ages={ages[19]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`21 de ${res.months[month]}`}
                                                        expressions={expressions[20]}
                                                        genders={genders[20]}
                                                        ages={ages[20]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`22 de ${res.months[month]}`}
                                                        expressions={expressions[21]}
                                                        genders={genders[21]}
                                                        ages={ages[21]} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`23 de ${res.months[month]}`}
                                                        expressions={expressions[22]}
                                                        genders={genders[22]}
                                                        ages={ages[22]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`24 de ${res.months[month]}`}
                                                        expressions={expressions[23]}
                                                        genders={genders[23]}
                                                        ages={ages[23]} 
                                                    />
                                                </View> 
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`25 de ${res.months[month]}`}
                                                        expressions={expressions[24]}
                                                        genders={genders[24]}
                                                        ages={ages[24]} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day={`26 de ${res.months[month]}`}
                                                        expressions={expressions[25]}
                                                        genders={genders[25]}
                                                        ages={ages[25]} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day={`27 de ${res.months[month]}`}
                                                        expressions={expressions[26]}
                                                        genders={genders[26]}
                                                        ages={ages[26]} 
                                                    />
                                                </View> 
                                                {genders[27] ? 
                                                    <View>
                                                        <TablesDetectionsPDF 
                                                            day={`28 de ${res.months[month]}`}
                                                            expressions={expressions[27]}
                                                            genders={genders[27]}
                                                            ages={ages[27]} 
                                                        />
                                                    </View> :
                                                    null
                                                }
                                                {genders[28] ? 
                                                    <View style={{marginTop:"10px"}}>
                                                        <TablesDetectionsPDF 
                                                            day={`29 de ${res.months[month]}`}
                                                            expressions={expressions[28]}
                                                            genders={genders[28]}
                                                            ages={ages[28]} 
                                                        />
                                                    </View> :
                                                    null
                                                }
                                                {genders[29] ? 
                                                    <View>
                                                        <TablesDetectionsPDF 
                                                            day={`30 de ${res.months[month]}`}
                                                            expressions={expressions[29]}
                                                            genders={genders[29]}
                                                            ages={ages[29]} 
                                                        /> 
                                                    </View>:
                                                    null
                                                }
                                                {genders[30] ? 
                                                    <View>
                                                        <TablesDetectionsPDF 
                                                            day={`31 de ${res.months[month]}`}
                                                            expressions={expressions[30]}
                                                            genders={genders[30]}
                                                            ages={ages[30]} 
                                                        /> 
                                                    </View>:
                                                    null
                                                }
                                            </>
                                            :
                                            <View>
                                                <Text>Cargando...</Text>
                                            </View>
                                        }  
                                        
                                    </View>
                                </View>     
                            </View>
                        </Page>  
                    </Document>
                </PDFViewer>
                : 
                <div className="sm:ml-64 bg-white-custon">
                    <SecondarySpinner/>
                </div>
            }
        </div>

    )
}