//Main Book Class: For a Book
class Book{ //function Book also works here
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI Class: Handle UI
class UI
{
    static displayBooks()
    {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }


    static addBookToList(book)
    {
        const list = document.querySelector("#book-list"); //Main table body

        const row = document.createElement("tr");

        //Uses innerHTML instead of textContent to display HTML DOM elements w/ Bootstrap
        row.innerHTML= ` 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td> <a href="#" class="btn btn-danger btn-sm delete">X</a> /td>
        `;

        list.appendChild(row) //Adds row contents from new book addition=>local storage=>list
    }

    //Delete Books function
    static deleteBook(e_target){
        if(e_target.classList.contains("delete"))
        { //Checks nodelist to see if the <td> contains a delete (line49)
            e_target.parentElement.parentElement.remove(); //Targets the parent of <td> => <tr> which is row & removes it
        }
    }

    //Shows Required Field Alerts For Input Validation
    static showAlert(message, className)
    {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form); //Inserts the caption before the form in the UI & HTML
        
        //Vanish in 1 seconds with setTimeout()
        setTimeout( (time)=>
        {
            document.querySelector(".alert").remove()
        },1000)

    }

        //Clear Input Function 
        static clearFields()
        {
            document.querySelector("#title").value = "";
            document.querySelector("#author").value="";
            document.getElementById("isbn").value="";
        }

        
}

//Store Class: Handling Local Storage (Local Storage only handles strings)
class Store{
    static getBooks() //Get Books from form DOM
    {
        let books;
        if(localStorage.getItem("books")===null)
        {
            books= [];
        } else 
            {
                //String to array
                //Use string from local storage by parsing it through JSON
                books = JSON.parse(localStorage.getItem("books"));
            }
        return books;
    }

    static addBook(book) //Add Books to local storage as a string
    {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBook(isbn)
    {
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem("books",JSON.stringify(books));
    }

}


//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks); //Displays books when DOM is loaded.


//Event: Add a Book On Submit
document.querySelector("#book-form").addEventListener("submit",(e)=>{

    //Prevent default submit action so book objects can show. Check devtools
    e.preventDefault();

    //Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    
   //Validate
   if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Complete All Required Fields", "warning"); //Calls bootstrap alerts like 
   }else {
    //Re-iniitalize new books using object constructors
    const book = new Book(title, author, isbn);

        //Add new Book to UI
        UI.addBookToList(book);

        //Add book to local storage
        Store.addBook(book);


        //Shows book successfully added caption
        UI.showAlert("Book Added!","light");

        //Clear input fields on submit
        UI.clearFields(); 
   }


})

//Event: Remove a Book Using Event Bubbling/Probagation
document.querySelector("#book-list").addEventListener("click",(e)=>
{ 
    //Select the [x]button's parent, bubbles into child
    UI.deleteBook(e.target); //Targets entire list

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ///Shows book successfully removed caption
    UI.showAlert("Book Removed!","primary");
})
