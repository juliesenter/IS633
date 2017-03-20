function MenuChoice(selection)
{
    document.getElementById("Section1").style.visibility="hidden";
    document.getElementById("Section2").style.visibility="hidden";
    
    switch (selection)
    {
        case "Section1":
            document.getElementById("Section1").style.visibility="visible";
            break;
        case "Section2":
            document.getElementById("Section2").style.visibility="visible";
            break;
        case "None":
            //No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a different menu option");
    }
}