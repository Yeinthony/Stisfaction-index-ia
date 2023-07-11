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
import { getExpressionsForWeek } from '../../../api/expressions.api';
import { getGendersForWeek } from '../../../api/genders.api';
import { getAgesForWeek } from '../../../api/ages.api';
import { 
    averagePorcentageExpressions, 
    averagePorcentageGenders, 
    averagePorcentageAges 
} from "../../../helpers/AveragePorcentange";
import logo from "../../../assets/img/logos/expressionsIA2.png";


export function ShowPDFWeek() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const organization = localStorage.getItem('organization');
    const today = new Date();
    const res = getDaysMonths();
    const token = sessionStorage.getItem('token');
    const week = DateTime.local().weekNumber;
    const year = today.getFullYear();
    
    useEffect(() => {

        const expressionsWeek = async() =>{
            const record = await getExpressionsForWeek(token, week, year);

            const expressionsOfTheWeek = {
                monday: {
                    day:"monday",
                    expressions: []
                },
                tuesday: {
                    day: "tuesday",
                    expressions: []
                },
                wednesday: {
                    day: "wednesday",
                    expressions: []
                },
                thursday: {
                    day: "thursday",
                    expressions: []
                },
                friday: {
                    day: "friday",
                    expressions: []
                },
                saturday: {
                    day: "saturday",
                    expressions: []
                },
                sunday: {
                    day: "sunday",
                    expressions: []
                }
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") expressionsOfTheWeek.monday.expressions.push(el);
                if(day === "Martes") expressionsOfTheWeek.tuesday.expressions.push(el);
                if(day === "Miercoles") expressionsOfTheWeek.wednesday.expressions.push(el);
                if(day === "Jueves") expressionsOfTheWeek.thursday.expressions.push(el);
                if(day === "Viernes") expressionsOfTheWeek.friday.expressions.push(el);
                if(day === "Sabado") expressionsOfTheWeek.saturday.expressions.push(el);
                if(day === "Domingo") expressionsOfTheWeek.sunday.expressions.push(el);
            });

            // Average porcentaje of expressions per day
            expressionsOfTheWeek.monday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.monday.expressions);
            expressionsOfTheWeek.tuesday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.tuesday.expressions);
            expressionsOfTheWeek.wednesday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.wednesday.expressions);
            expressionsOfTheWeek.thursday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.thursday.expressions);
            expressionsOfTheWeek.friday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.friday.expressions);
            expressionsOfTheWeek.saturday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.saturday.expressions);
            expressionsOfTheWeek.sunday.expressions = averagePorcentageExpressions(expressionsOfTheWeek.sunday.expressions);

            console.log(expressionsOfTheWeek);

            setExpressions(expressionsOfTheWeek);
        }

        const gendersWeek = async() =>{
            const record = await getGendersForWeek(token, week, year);
            const gendersOfTheWeek = {
                monday: {
                    day:"monday",
                    genders: []
                },
                tuesday: {
                    day: "tuesday",
                    genders: []
                },
                wednesday: {
                    day: "wednesday",
                    genders: []
                },
                thursday: {
                    day: "thursday",
                    genders: []
                },
                friday: {
                    day: "friday",
                    genders: []
                },
                saturday: {
                    day: "saturday",
                    genders: []
                },
                sunday: {
                    day: "sunday",
                    genders: []
                }
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") gendersOfTheWeek.monday.genders.push(el);
                if(day === "Martes") gendersOfTheWeek.tuesday.genders.push(el);
                if(day === "Miercoles") gendersOfTheWeek.wednesday.genders.push(el);
                if(day === "Jueves") gendersOfTheWeek.thursday.genders.push(el);
                if(day === "Viernes") gendersOfTheWeek.friday.genders.push(el);
                if(day === "Sabado") gendersOfTheWeek.saturday.genders.push(el);
                if(day === "Domingo") gendersOfTheWeek.sunday.genders.push(el);
            });

            // Average porcentaje of expressions per day
            gendersOfTheWeek.monday.genders = averagePorcentageGenders(gendersOfTheWeek.monday.genders);
            gendersOfTheWeek.tuesday.genders = averagePorcentageGenders(gendersOfTheWeek.tuesday.genders);
            gendersOfTheWeek.wednesday.genders = averagePorcentageGenders(gendersOfTheWeek.wednesday.genders);
            gendersOfTheWeek.thursday.genders = averagePorcentageGenders(gendersOfTheWeek.thursday.genders);
            gendersOfTheWeek.friday.genders = averagePorcentageGenders(gendersOfTheWeek.friday.genders);
            gendersOfTheWeek.saturday.genders = averagePorcentageGenders(gendersOfTheWeek.saturday.genders);
            gendersOfTheWeek.sunday.genders = averagePorcentageGenders(gendersOfTheWeek.sunday.genders);

            console.log(gendersOfTheWeek);
            setGenders(gendersOfTheWeek);
        }

        const agesWeek = async() =>{
            const record = await getAgesForWeek(token, week, year);
            const agesOfTheWeek = {
                monday: {
                    day:"monday",
                    ages: []
                },
                tuesday: {
                    day: "tuesday",
                    ages: []
                },
                wednesday: {
                    day: "wednesday",
                    ages: []
                },
                thursday: {
                    day: "thursday",
                    ages: []
                },
                friday: {
                    day: "friday",
                    ages: []
                },
                saturday: {
                    day: "saturday",
                    ages: []
                },
                sunday: {
                    day: "sunday",
                    ages: []
                }
            }
          
            // Group expressions by day
            record.data.forEach(el => {
                let date = new Date(el.year, el.month-1, el.day);
                let day = res.days[date.getDay()];
                if(day === "Lunes") agesOfTheWeek.monday.ages.push(el);
                if(day === "Martes") agesOfTheWeek.tuesday.ages.push(el);
                if(day === "Miercoles") agesOfTheWeek.wednesday.ages.push(el);
                if(day === "Jueves") agesOfTheWeek.thursday.ages.push(el);
                if(day === "Viernes") agesOfTheWeek.friday.ages.push(el);
                if(day === "Sabado") agesOfTheWeek.saturday.ages.push(el);
                if(day === "Domingo") agesOfTheWeek.sunday.ages.push(el);
            });

            // Average porcentaje of expressions per day
            agesOfTheWeek.monday.ages = averagePorcentageAges(agesOfTheWeek.monday.ages);
            agesOfTheWeek.tuesday.ages = averagePorcentageAges(agesOfTheWeek.tuesday.ages);
            agesOfTheWeek.wednesday.ages = averagePorcentageAges(agesOfTheWeek.wednesday.ages);
            agesOfTheWeek.thursday.ages = averagePorcentageAges(agesOfTheWeek.thursday.ages);
            agesOfTheWeek.friday.ages = averagePorcentageAges(agesOfTheWeek.friday.ages);
            agesOfTheWeek.saturday.ages = averagePorcentageAges(agesOfTheWeek.saturday.ages);
            agesOfTheWeek.sunday.ages = averagePorcentageAges(agesOfTheWeek.sunday.ages);

            console.log(agesOfTheWeek);
            setAges(agesOfTheWeek);
        }

        expressionsWeek();
        gendersWeek();
        agesWeek();

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
                                            <Text style={{fontSize:"33px", fontWeight:"extrabold", marginTop:"5px"}}>REPORTE SEMANAL</Text>
                                        </View>
                                        <Image style={{ width:"70px", position:"absolute", right:"0" }} src={logo} alt="user photo" id="img-user"/>
                                    </View>
                                    <View style={{marginTop:"55px", position:"relative"}}>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"relative", width:"250px"}}>
                                            <Text style={{width:"90px", fontSize:"13px"}}>NOMBRE:</Text>
                                            <Text style={{width:"160px", fontSize:"13px", position:"absolute", right:"0", top:"8px", textTransform:"uppercase"}}>{name}</Text>
                                        </View>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"absolute", width:"170px", right:"0"}}>
                                            <Text style={{width:"70px", fontSize:"13px"}}>SEMANA:</Text>
                                            <Text style={{width:"90px", fontSize:"13px", position:"absolute", right:"0", top:"8px"}}>{`Nº ${week}`}</Text>
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
                                                        day="Lunes" 
                                                        expressions={expressions.monday.expressions}
                                                        genders={genders.monday.genders}
                                                        ages={ages.monday.ages} 
                                                    /> 
                                                </View> 
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Martes" 
                                                        expressions={expressions.tuesday.expressions}
                                                        genders={genders.tuesday.genders}
                                                        ages={ages.tuesday.ages} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Miercoles" 
                                                        expressions={expressions.wednesday.expressions}
                                                        genders={genders.wednesday.genders}
                                                        ages={ages.wednesday.ages} 
                                                    /> 
                                                </View>
                                                <View style={{marginBottom:"25px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Jueves" 
                                                        expressions={expressions.thursday.expressions}
                                                        genders={genders.thursday.genders}
                                                        ages={ages.thursday.ages} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"5px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Viernes" 
                                                        expressions={expressions.friday.expressions}
                                                        genders={genders.friday.genders}
                                                        ages={ages.friday.ages} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Sabado" 
                                                        expressions={expressions.saturday.expressions}
                                                        genders={genders.saturday.genders}
                                                        ages={ages.saturday.ages} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Domingo" 
                                                        expressions={expressions.sunday.expressions}
                                                        genders={genders.sunday.genders}
                                                        ages={ages.sunday.ages} 
                                                    />
                                                </View> 
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