import { useEffect, useState } from "react";

//Dependencies
import {Document, Image, PDFViewer, Page, Text, View} from "@react-pdf/renderer";

//Components
import { Sidebar } from "../../../components/Sidebar";
import { Navbar } from "../../../components/Navbar"; 
import { TablesDetectionsPDF } from "../../../components/TableDetectionsPDF";
import { SecondarySpinner } from "../../../components/SecondarySpinner";

//Others
import { Unfold } from "../../../helpers/Unfold"; 
import { getDaysMonths } from "../../../helpers/GetDaysMonths";
import { getExpressionsForYear } from '../../../api/expressions.api';
import { getGendersForYear } from '../../../api/genders.api';
import { getAgesForYear } from '../../../api/ages.api';
import { 
    averagePorcentageExpressions, 
    averagePorcentageGenders, 
    averagePorcentageAges 
} from "../../../helpers/AveragePorcentange";
import logo from "../../../assets/img/logos/expressionsIA2.png";


export function ShowPDFYear() {

    const [expressions, setExpressions] = useState(false);
    const [genders, setGenders] = useState(false);
    const [ages, setAges] = useState(false);

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const today = new Date();
    const res = getDaysMonths();
    const token = sessionStorage.getItem('token');
    const year = today.getFullYear();

    useEffect(() => {

        const expressionsYear = async() =>{
            const record = await getExpressionsForYear(token, year);

            const expressionsOfTheYear = {
                january: [],
                february: [],
                march: [],
                april: [],
                may: [],
                june: [],
                july: [],
                august: [],
                september: [],
                octuber: [],
                november: [],
                december: []
            }
          
            // Group expressions by year
            record.data.forEach(el => {
                let month = res.months[today.getMonth()];
                if(month === "Enero") expressionsOfTheYear.january.push(el);
                if(month === "Febrero") expressionsOfTheYear.february.push(el);
                if(month === "Marzo") expressionsOfTheYear.march.push(el);
                if(month === "Abril") expressionsOfTheYear.april.push(el);
                if(month === "Mayo") expressionsOfTheYear.may.push(el);
                if(month === "Junio") expressionsOfTheYear.june.push(el);
                if(month === "Julio") expressionsOfTheYear.july.push(el);
                if(month === "August") expressionsOfTheYear.august.push(el);
                if(month === "Septiembre") expressionsOfTheYear.september.push(el);
                if(month === "Obtubre") expressionsOfTheYear.octuber.push(el);
                if(month === "Noviembre") expressionsOfTheYear.november.push(el);
                if(month === "Diciembre") expressionsOfTheYear.december.push(el);
            });

            // Average porcentaje of expressions per day
            expressionsOfTheYear.january = averagePorcentageExpressions(expressionsOfTheYear.january);
            expressionsOfTheYear.february = averagePorcentageExpressions(expressionsOfTheYear.february);
            expressionsOfTheYear.march = averagePorcentageExpressions(expressionsOfTheYear.march);
            expressionsOfTheYear.april = averagePorcentageExpressions(expressionsOfTheYear.april);
            expressionsOfTheYear.may = averagePorcentageExpressions(expressionsOfTheYear.may);
            expressionsOfTheYear.june = averagePorcentageExpressions(expressionsOfTheYear.june);
            expressionsOfTheYear.july = averagePorcentageExpressions(expressionsOfTheYear.july);
            expressionsOfTheYear.august = averagePorcentageExpressions(expressionsOfTheYear.august);
            expressionsOfTheYear.september = averagePorcentageExpressions(expressionsOfTheYear.september);
            expressionsOfTheYear.octuber = averagePorcentageExpressions(expressionsOfTheYear.octuber);
            expressionsOfTheYear.november = averagePorcentageExpressions(expressionsOfTheYear.november);
            expressionsOfTheYear.december = averagePorcentageExpressions(expressionsOfTheYear.december);

            setExpressions(expressionsOfTheYear);
        }

        const gendersYear = async() =>{
            const record = await getGendersForYear(token, year);
            const gendersOfTheYear = {
                january: [],
                february: [],
                march: [],
                april: [],
                may: [],
                june: [],
                july: [],
                august: [],
                september: [],
                octuber: [],
                november: [],
                december: []
            }
          
            // Group genders by year
            record.data.forEach(el => {
                let month = res.months[today.getMonth()];
                if(month === "Enero") gendersOfTheYear.january.push(el);
                if(month === "Febrero") gendersOfTheYear.february.push(el);
                if(month === "Marzo") gendersOfTheYear.march.push(el);
                if(month === "Abril") gendersOfTheYear.april.push(el);
                if(month === "Mayo") gendersOfTheYear.may.push(el);
                if(month === "Junio") gendersOfTheYear.june.push(el);
                if(month === "Julio") gendersOfTheYear.july.push(el);
                if(month === "August") gendersOfTheYear.august.push(el);
                if(month === "Septiembre") gendersOfTheYear.september.push(el);
                if(month === "Obtubre") gendersOfTheYear.octuber.push(el);
                if(month === "Noviembre") gendersOfTheYear.november.push(el);
                if(month === "Diciembre") gendersOfTheYear.december.push(el);
            });

            // Average porcentaje of genders per day
            gendersOfTheYear.january = averagePorcentageGenders(gendersOfTheYear.january);
            gendersOfTheYear.february = averagePorcentageGenders(gendersOfTheYear.february);
            gendersOfTheYear.march = averagePorcentageGenders(gendersOfTheYear.march);
            gendersOfTheYear.april = averagePorcentageGenders(gendersOfTheYear.april);
            gendersOfTheYear.may = averagePorcentageGenders(gendersOfTheYear.may);
            gendersOfTheYear.june = averagePorcentageGenders(gendersOfTheYear.june);
            gendersOfTheYear.july = averagePorcentageGenders(gendersOfTheYear.july);
            gendersOfTheYear.august = averagePorcentageGenders(gendersOfTheYear.august);
            gendersOfTheYear.september = averagePorcentageGenders(gendersOfTheYear.september);
            gendersOfTheYear.octuber = averagePorcentageGenders(gendersOfTheYear.octuber);
            gendersOfTheYear.november = averagePorcentageGenders(gendersOfTheYear.november);
            gendersOfTheYear.december = averagePorcentageGenders(gendersOfTheYear.december);

            setGenders(gendersOfTheYear);
        }

        const agesYear = async() =>{
            const record = await getAgesForYear(token, year);
            const agesOfTheYear = {
                january: [],
                february: [],
                march: [],
                april: [],
                may: [],
                june: [],
                july: [],
                august: [],
                september: [],
                octuber: [],
                november: [],
                december: []
            }
          
            // Group genders by year
            record.data.forEach(el => {
                let month = res.months[today.getMonth()];
                if(month === "Enero") agesOfTheYear.january.push(el);
                if(month === "Febrero") agesOfTheYear.february.push(el);
                if(month === "Marzo") agesOfTheYear.march.push(el);
                if(month === "Abril") agesOfTheYear.april.push(el);
                if(month === "Mayo") agesOfTheYear.may.push(el);
                if(month === "Junio") agesOfTheYear.june.push(el);
                if(month === "Julio") agesOfTheYear.july.push(el);
                if(month === "August") agesOfTheYear.august.push(el);
                if(month === "Septiembre") agesOfTheYear.september.push(el);
                if(month === "Obtubre") agesOfTheYear.octuber.push(el);
                if(month === "Noviembre") agesOfTheYear.november.push(el);
                if(month === "Diciembre") agesOfTheYear.december.push(el);
            });

            // Average porcentaje of genders per day
            agesOfTheYear.january = averagePorcentageAges(agesOfTheYear.january);
            agesOfTheYear.february = averagePorcentageAges(agesOfTheYear.february);
            agesOfTheYear.march = averagePorcentageAges(agesOfTheYear.march);
            agesOfTheYear.april = averagePorcentageAges(agesOfTheYear.april);
            agesOfTheYear.may = averagePorcentageAges(agesOfTheYear.may);
            agesOfTheYear.june = averagePorcentageAges(agesOfTheYear.june);
            agesOfTheYear.july = averagePorcentageAges(agesOfTheYear.july);
            agesOfTheYear.august = averagePorcentageAges(agesOfTheYear.august);
            agesOfTheYear.september = averagePorcentageAges(agesOfTheYear.september);
            agesOfTheYear.octuber = averagePorcentageAges(agesOfTheYear.octuber);
            agesOfTheYear.november = averagePorcentageAges(agesOfTheYear.november);
            agesOfTheYear.december = averagePorcentageAges(agesOfTheYear.december);

            setAges(agesOfTheYear);
        }

        expressionsYear();
        gendersYear();
        agesYear();

    }, []);
    
    return (
        
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            {expressions && genders && ages ?
                <PDFViewer style={{
                    width:"83%", 
                    height:"93.6vh", 
                    marginLeft:"17%",
                    marginTop:"3rem"
                }}>
                    <Document>
                        <Page size="A4">
                            <View style={{paddingTop:"75px", paddingLeft:"75px", paddingBottom:"50px", paddingRight:"50px"}}>
                                <View>
                                    <View style={{display: "flex"}}>
                                        <View style={{marginTop:"5px"}}>
                                            <Text style={{fontSize:"13px"}}>E X P R E S S I O N S  .I A</Text>
                                            <Text style={{fontSize:"33px", fontWeight:"extrabold", marginTop:"5px"}}>REPORTE ANUAL</Text>
                                        </View>
                                        <Image style={{ width:"70px", position:"absolute", right:"0" }} src={logo} alt="user photo" id="img-user"/>
                                    </View>
                                    <View style={{marginTop:"55px", position:"relative"}}>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"relative", width:"250px"}}>
                                            <Text style={{width:"90px", fontSize:"13px"}}>NOMBRE:</Text>
                                            <Text style={{width:"160px", fontSize:"13px", position:"absolute", right:"0", top:"8px", textTransform:"uppercase"}}>{name}</Text>
                                        </View>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"absolute", width:"120px", right:"0"}}>
                                            <Text style={{width:"70px", fontSize:"13px"}}>AÑO:</Text>
                                            <Text style={{width:"55px", fontSize:"13px", textTransform:"uppercase", position:"absolute", right:"0", top:"8px"}}>{year}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop:"130px"}}>
                                        <View style={{left:"0", right:"0"}}>
                                            <Text style={{textAlign:"center", fontSize:"22"}}>DETALLES DE LAS DETECCIONES</Text>
                                        </View>
        
                                        {expressions && genders && ages ? 
                                            <>
                                                <View style={{marginTop:"40px", marginBottom:"140px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Enero" 
                                                        expressions={expressions.january}
                                                        genders={genders.january}
                                                        ages={ages.january}
                                                    /> 
                                                </View> 
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Febrero" 
                                                        expressions={expressions.february}
                                                        genders={genders.february}
                                                        ages={ages.february} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Marzo" 
                                                        expressions={expressions.march}
                                                        genders={genders.march}
                                                        ages={ages.march} 
                                                    /> 
                                                </View>
                                                <View style={{marginBottom:"25px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Abril" 
                                                        expressions={expressions.april}
                                                        genders={genders.april}
                                                        ages={ages.april}  
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"5px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Mayo" 
                                                        expressions={expressions.may}
                                                        genders={genders.may}
                                                        ages={ages.may} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Junio" 
                                                        expressions={expressions.june}
                                                        genders={genders.june}
                                                        ages={ages.june}  
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Julio" 
                                                        expressions={expressions.july}
                                                        genders={genders.july}
                                                        ages={ages.july} 
                                                    />
                                                </View> 
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Agosto" 
                                                        expressions={expressions.august}
                                                        genders={genders.august}
                                                        ages={ages.august}  
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Septiembre" 
                                                        expressions={expressions.september}
                                                        genders={genders.september}
                                                        ages={ages.september}  
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Octubre" 
                                                        expressions={expressions.octuber}
                                                        genders={genders.octuber}
                                                        ages={ages.octuber} 
                                                    /> 
                                                </View>
                                                <View style={{marginTop:"10px"}}>
                                                    <TablesDetectionsPDF 
                                                        day="Noviembre" 
                                                        expressions={expressions.november}
                                                        genders={genders.november}
                                                        ages={ages.november} 
                                                    /> 
                                                </View>
                                                <View>
                                                    <TablesDetectionsPDF 
                                                        day="Diciembre" 
                                                        expressions={expressions.december}
                                                        genders={genders.december}
                                                        ages={ages.december} 
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