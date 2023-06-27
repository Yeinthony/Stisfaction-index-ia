//Dependencies
import {Document, Image, PDFViewer, Page, Text, View} from "@react-pdf/renderer";

export function TablesDetectionsPDF({expressions, genders, ages, day}){
    return(
        
        <>
            <View style={{marginTop:"30px"}}>
                <Text>{day}</Text>
            </View>
            <View style={{marginTop:"10px", position:"relative"}}>
                <View style={{backgroundColor:"#ededed", width:"160px"}}>
                    <View style={{position:"relative"}}>
                        <View style={{position: "relative", backgroundColor:"#5F9EC1", padding:"10px",}}>
                            <View>
                                <Text style={{fontSize:"13px"}}>Expresión</Text>
                            </View>
                            <View style={{position:"absolute", top:"10", right:"10"}}>
                                <Text style={{fontSize:"13px"}}>Porcentaje</Text>
                            </View>
                        </View>
                        <View style={{padding:"10px"}}>
                            <View style={{position:"relative"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Enojo</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.angry} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Disgusto</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.disgust} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Miedo</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.fear} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Felicidad</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.happy} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Neutral</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.neutral} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Tristeza</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.sad} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Sorpresa</Text>
                                </View>
                                <View style={{position:"absolute", left:"80"}}>
                                    <Text style={{fontSize:"12px"}}>{expressions.surprise} %</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor:"#ededed", width:"135px", position:"absolute", left:"170px"}}>
                    <View style={{position:"relative"}}>
                        <View style={{position: "relative", backgroundColor:"#5F9EC1", padding:"10px"}}>
                            <View>
                                <Text style={{fontSize:"13px"}}>Edad</Text>
                            </View>
                            <View style={{position:"absolute", top:"10", right:"10"}}>
                                <Text style={{fontSize:"13px"}}>Porcentaje</Text>
                            </View>
                        </View>
                        <View  style={{padding:"10px"}}>
                            <View style={{position:"relative"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>6-11</Text>
                                </View>
                                <View style={{position:"absolute", left:"55"}}>
                                    <Text style={{fontSize:"12px"}}>{ages.six_to_eleven} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>12-18</Text>
                                </View>
                                <View style={{position:"absolute", left:"55"}}>
                                    <Text style={{fontSize:"12px"}}>{ages.twelve_to_eighteen} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>19-26</Text>
                                </View>
                                <View style={{position:"absolute", left:"55"}}>
                                    <Text style={{fontSize:"12px"}}>{ages.nineteen_to_twentysix} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>27-59</Text>
                                </View>
                                <View style={{position:"absolute", left:"55"}}>
                                    <Text style={{fontSize:"12px"}}>{ages.twentyseveven_to_fiftynine} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>60-80</Text>
                                </View>
                                <View style={{position:"absolute", left:"55"}}>
                                    <Text style={{fontSize:"12px"}}>{ages.sixty_to_eighty} %</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor:"#ededed", width:"155px", position:"absolute", right:"0"}}>
                    <View style={{position:"relative"}}>
                        <View style={{position: "relative", backgroundColor:"#5F9EC1", padding:"10px"}}>
                            <View>
                                <Text style={{fontSize:"13px"}}>Genero</Text>
                            </View>
                            <View style={{position:"absolute", top:"10", right:"10"}}>
                                <Text style={{fontSize:"13px"}}>Porcentaje</Text>
                            </View>
                        </View>
                        <View style={{padding:"10px"}}>
                            <View style={{position:"relative"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Masculino</Text>
                                </View>
                                <View style={{position:"absolute", left:"75"}}>
                                    <Text style={{fontSize:"12px"}}>{genders.male} %</Text>
                                </View>
                            </View>
                            <View style={{position:"relative", marginTop:"10px"}}>
                                <View>
                                    <Text style={{fontSize:"12px"}}>Femenino</Text>
                                </View>
                                <View style={{position:"absolute", left:"75"}}>
                                    <Text style={{fontSize:"12px"}}>{genders.female} %</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </>
        
    )
}