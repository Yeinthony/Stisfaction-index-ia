export function Unfold(e){
    const $dropdownUserToggle = document.getElementById('dropdown-user');
    const $sidebar = document.getElementById('logo-sidebar');

    //Despliega u oculta las opciones del usuario en el navbar
    if(e.target.matches("#img-user")){
        $dropdownUserToggle.classList.toggle('hidden');
    }else{
        $dropdownUserToggle.classList.add('hidden');
    }     

    //Despliega u oculta el sidebar
    if(e.target.matches("#sidebarButton") || e.target.matches("#sidebarSVG") || e.target.matches("#sidebarPath")){
        $sidebar.classList.toggle('-translate-x-full');
    }else{
        $sidebar.classList.add('-translate-x-full')
    }  
}