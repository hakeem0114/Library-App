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
        const StoredBooks =[  //Local Storage
            {
                title: "Book 1: Water",
                author: "Aang",
                isbn: "1234567890",
            },
            {
                title: "Hired as a SWE",
                author: "Hakeem",
                isbn: "1234512345",
            }

                           ];

        const books = StoredBooks;

        books.forEach((book)=>{
            UI.addBookToList(book);
        })
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
        if(e_target.classList.contains("delete")){ //Checks nodelist to see if the <td> contains a delete (line49)
            e_target.parentElement.parentElement.remove(); //Targets the parent of <td> => <tr> which is row & removes it
        }
    }


        //Clear Input Function 
        static clearFields()
        {
            document.querySelector("title").value = "";
            document.querySelector("#author").value="";
            document.getElementById(isbn).value="";
        }

        
}

//Store Class: Handling Local Storage

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
      
   }
   
    //Re-iniitalize new books using object constructors
    const book = new Book(title, author, isbn);

    //Add new Book to UI
    UI.addBookToList(book);

    //Clear input fields on submit
    UI.clearFields(); 
})

//Event: Remove a Book Using Event Bubbling/Probagation
document.querySelector("#book-list").addEventListener("click",(e)=>
{ //Select the [x]button's parent, bubbles into child
    UI.deleteBook(e.target); //Targets entire list
})
