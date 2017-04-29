function MenuChoice(selection)
{
    document.getElementById("customerlist").style.visibility="hidden";
    document.getElementById("orderhistory").style.visibility="hidden";
    document.getElementById("currentorders").style.visibility="hidden";
    document.getElementById("orderupdate").style.visibility="hidden";
    document.getElementById("addcustomer").style.visibility="hidden";
    document.getElementById("deletecustomer").style.visibility="hidden";
    document.getElementById("location").style.visibility="hidden";
    document.getElementById("picture").style.visibility="hidden";
    document.getElementById("contacts").style.visibility="hidden";
    document.getElementById("about").style.visibility="hidden";
    
    switch (selection)
    {
        case "customerlist":
            document.getElementById("customerlist").style.visibility="visible";//Makes the Customer List HTML section visible
            ListCustomers();//Calls the funciton that creates the customer list
            break;
        case "orderhistory":
            document.getElementById("orderhistory").style.visibility="visible";
            break;
        case "currentorders":
            document.getElementById("currentorders").style.visibility="visible";//Makes the Current Order List HTML section visible
            //CurrentOrders();//Calls the funciton that creates a list of current customer orders
            break;
        case "update":
            document.getElementById("orderupdate").style.visibility="visible";
            break;
        case "addcustomer":
            document.getElementById("addcustomer").style.visibility="visible";
            break;
        case "deletecustomer":
            document.getElementById("deletecustomer").style.visibility="visible";
            break;
        case "Geolocation":
            document.getElementById("location").style.visibility="visible";
            break;
        case "camera":
            document.getElementById("picture").style.visibility="visible";
            break;
        case "contacts":
            document.getElementById("contacts").style.visibility="visible";
            break;
        case "about":
            document.getElementById("about").style.visibility="visible";
            break;
        case "None":
            //No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

function ListCustomers()//This sends a request to the getAllCustomers service and creates a table with the data returned
{
    var xmlhttp=new XMLHttpRequest();//Creates the XMLHttpRequest Object
    var url="https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";//URL for the service
    
    xmlhttp.onreadystatechange=function(){//Creates the event handler for service request
    if(xmlhttp.readyState==4&&xmlhttp.status==200){
            var output=JSON.parse(xmlhttp.responseText);//Captures the data returned from the service and puts in an object
            GenerateOutput(output);//Calls the function that creates the output table and passes the data object to it
           }
    }
        xmlhttp.open("GET", url, true);//Sets the options for requesting the service
        xmlhttp.send(); //Calls the service
        
        function GenerateOutput(result)//This function receives the data from the service and creates a table to display it
        {
            var display="<table><tr><th>Update</th><th>Customer ID</th><th>Customer Name</th><th>City</th><th><Delete></th></tr>"; //Table headings
            var count=0;//Count variable loop
             var customerid="";//Variable to store the Customer ID
             var companyname="";//Variable to store the Customer Name
             var city="";//Variable to store the Customer City
            for(count=0; count<result.GetAllCustomersResult.length; count++)//Loop for creating table rows
            {
                //Anchor link: <a href="javascript:function("parameter");">
                customerid=result.GetAllCustomersResult[count].CustomerID;//Assigns the Customer ID to a variable
                companyname='<a href="javascript:OrderHistory(' + "'" + customerid + "');" + '">';
                companyname+=result.GetAllCustomersResult[count].CompanyName;
                companyname+='</a>';
                
                city=result.GetAllCustomersResult[count].City;//Assigns Customer city to a variable
                display+='<tr><td><button onclick="CurrentOrders(' + "'" + customerid + "')" + '">Current Orders</button></td><td>' + customerid +
                "</td><td>" + companyname + "</td><td>" + city + '</td><td><button onclick="DeleteCustomer(' + "'" + customerid + "')" + '">Delete Customer</button></td></tr>';//Creates a table row
            }
                display+="</table>";//closes table html
                document.getElementById("listcustomers").innerHTML=display;//displays table in html page               
            }
        }
        
        function OrderHistory(customerid)//Retrieves a list of orders by a particular customer using the customer ID for the search
        {
            MenuChoice("orderhistory");
            var xmlhttp=new XMLHttpRequest();
            //var customerid = document.getElementById("CustomerID").value;
            var url="https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";//Service URL
            url+=customerid;//Customer ID to complete Service URL
            
            xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4&&xmlhttp.status==200){
                var output=JSON.parse(xmlhttp.responseText);
                GenerateOutput(output);
            }
        }
        
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
        function GenerateOutput(result)//Function that displays results
        {
            var display="<table><tr><th>Product</th><th>Total Sold</th></tr>";
            var count=0;
            for(count=0; count<result.length; count++)
            {
                display+="<tr id=" + count +"><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td><td>" + "</td></tr>";
            }
                display+="</table>";
                document.getElementById("orders").innerHTML=display;
                MenuChoice("orderhistory");
                
            }
        }

function CurrentOrders(customerid)
    {
        //MenuChoice("currentorders");
        var xmlhttp=new XMLHttpRequest();
        var url="https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
        url+=customerid;
        
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4&&xmlhttp.status==200){
                var output=JSON.parse(xmlhttp.responseText);
                GenerateOutput(output);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
    function GenerateOutput(result)//Function that displays results
        {
            var display="<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Ship Date</th></tr>";
            var count=0;
            var orderid="";//Variable to store the Order ID
            for(count=0; count<result.GetOrdersForCustomerResult.length; count++)
            {
                orderid=result.GetOrdersForCustomerResult[count].OrderID;//Assigns the Order ID to a variable
                display+="<tr id=" + count +"><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostCode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td><td>" + '</td><td><button onclick="OrderInfo(' + "'" + orderid + "')" + '">Update</button></td></tr>';
            }
                display+="</table>";
                document.getElementById("currorders").innerHTML=display;
                MenuChoice("currentorders");
                
            }
        }
function OrderInfo(orderid)
    {
        var xmlhttp=new XMLHttpRequest();
        var url="https://student.business.uab.edu/jsonwebservice/service1.svc/GetCustomerOrderInfo/";
        url+=orderid;
        
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4&&xmlhttp.status==200){
                var output=JSON.parse(xmlhttp.responseText);
                document.getElementById("OrderID").value=output[0].OrderID;
                document.getElementById("OrderDate").value=output[0].OrderDate;
                document.getElementById("ShipAddress").value=output[0].ShipAddress;
                document.getElementById("ShipCity").value=output[0].ShipCity;
                document.getElementById("ShipName").value=output[0].ShipName;
                document.getElementById("ShipPostCode").value=output[0].ShipPostCode;
                document.getElementById("ShippedDate").value=output[0].ShippedDate;
                MenuChoice("update");
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
    }

//This funciton executes an update operation
function OrderUpdate()
{
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4&&xmlhttp.status==200){
            var result=JSON.parse(xmlhttp.responseText);
            var outcome=result;
            var error=result.Exception;
            OperationResult(outcome, error); //Calls the function that displays the result in an alert message
            MenuChoice("customerlist");//Calls the menu choice function to display the customer list
        }
    }
    var url="https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    //var orderdate=document.getElementById("OrderDate").value;
    var orderid=document.getElementById("OrderID").value;
    var shipaddress=document.getElementById("ShipAddress").value;
    var shipcity=document.getElementById("ShipCity").value;
    var shipname=document.getElementById("ShipName").value;
    var shippostcode=document.getElementById("ShipPostCode").value;
    //var shippeddate=document.getElementById("ShippedDate").value;
    
    var parameters='{"OrderID":"' + orderid + '","ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipName":"' + shipname + '","ShipPostCode":"' + shippostcode + '"}';//Creates the JSON string to be sent for the update operation
    
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(parameters);
}

//Function that displays the result of an operation that adds, deletes, or updates data
//The funciton is invoked from other functions
function OperationResult(success, exception)
{
    switch (success)
    {
        case 1:
            alert("The operation was successful");
            break;
        case 0:
            alert("The operation was not successful:" + exception);
            break;
        case -2:
            alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
            break;
        case -3:
            alert("The operation was not successful because a record with the supplied Order ID could not be found");
            break;
        default:
            alert("The operation code returned is not identifiable.");
            
    }
}

//This function executes an add operation
function CreateCustomer()
{
    var objRequest=new XMLHttpRequest();
    objRequest.onreadystatechange=function(){
        if (objRequest.readyState==4&&objRequest.status==200){
            var result2=JSON.parse(objRequest.responseText);
            OperationResult2(result2); //Calls the function that displays the result in an alert message
            MenuChoice("customerlist");//Calls the menu choice function to display the customer list
        }
    }
    
    var url="https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var custid=document.getElementById("custid").value;
    var companyname=document.getElementById("CompanyName").value;
    var city=document.getElementById("City").value;
    
    //Create the parameter string
    var newcustomer='{"CustomerID":"' + custid + '","CompanyName":"' + companyname + '","City":"' + city +'"}';
    
    
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

//Function that displays the result of an operation that adds, deletes, or updates data
//The funciton is invoked from other functions
function OperationResult2(output2)
{
    //Test what got back
    if (output2.WasSuccessful == 1)
    {
        alert("The operation was successful");
    }
    else
    {
        alert("The operation was not successful");
    }
}
//Create function to delete store
function DeleteCustomer(customerid)
{
        //confirmation
        //var x;
        if (confirm("Are you sure you want to delete this customer?") == true) {
            alert("Deletion Operation Proceeding");
        } else {
            alert("Operation Cancelled!");
        }
   
    //create object for AJAX request
    var objRequest4 = new XMLHttpRequest();
    //creat url and query string
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
    url += customerid;
    
    //collect store data from webpage
    var custid4 = document.getElementById("customerid").value;
    
    //create parameter string
    var deletecustomer = '{"CustomerID":"' + custid4 + '"}';
    
    //check that object has returned data
    objRequest4.onreadystatechange = function()
    {
        if (objRequest4.readyState == 4 && objRequest4.status == 200)
        {
            var result4 = JSON.parse(objRequest4.responseText);
            OperationResult4(result4);
            MenuChoice("customerlist");//Calls the menu choice function to display the customer list
        }
    }
    
    //initiate the server request
    objRequest4.open("GET", url, true);
    objRequest4.send();
}
//Create Operation Result Function
function OperationResult4(output4)

{
    //Test what got back
    if (output4.DeleteCustomerResult.WasSuccessful == 1)
    {
        alert("Congratulations! You successfully deleted a customer!");
    }
    else
    {
        alert("Try again. Your attempt was not successful.");
    }

}

function Location()//Calls the Geolocation function
{
    var geo=navigator.geolocation;//References the navigator geolocation service in web browser
    if (geo)//tests to see if the geo service is available
    {
        geo.getCurrentPosition(showPosition);//if the geo service is available, gets the position & calls a function to display
    }
    else
    {
        alert("Geolocation is not supported");//displays message if geo is not available
    }
}

function showPosition(position)//Receives geo data and displays it
{
    var latitude=position.coords.latitude;//retrieves latitude data
    var longitude=position.coords.longitude;//retrieves longitude data
    document.getElementById("latitude").innerHTML=latitude;
    document.getElementById("longitude").innerHTML=longitude;
}

function CapturePhoto()
{
    navigator.camera.getPicture(onSuccess, onFail, {quality: 20, destinationtype:destinationtype.FILE_URL, saveToPhotoAlbum:true});
}

function onSuccess(imageURI)
{
    var pickdisplay=document.getElementById("snapshot");
    pickdisplay.style.display='block';
    pickdisplay.src=imageURI;
}

function onFail(message)
{
    alert("Failed because: " + message);
}

function PickContact()
{
    navigator.contacts.pickContact(function(contact));
    {
        var contactinfo="";
        contactinfo +=contact.name.givenName + "" + contact.name.familyName + "<br>";
        var count=0;
        if (contact.phoneNumbers !==null)
        {
            for (count=0; count<contact.phoneNumbers.length; count++)
            {
                contactinfo += contact.phoneNumbers[count].type +":" + contact.phoneNumbers[count].value + "<br>";
            }
        }
        if (contact.emails !==null)
        {
            for(count=0; count<contact.emails.length; count++)
            {
                contactinfo +=contact.emails[count]type + ":" + contact.emails[count].value + "<br>";
            }
        }
        document.getElementById("contactname").innerHTML=contactinfo;
        
    },function(err)
    {
        alert("Error:" + err);
    }
    );
}