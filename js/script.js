/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
the function uses ist of students and number of pages as paramaters. 
Then a loop is used to create and format the "list" to show student info. 
*/
function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for ( let i = 0; i < list.length; i++ ) {
      if (i >= startIndex && i < endIndex) {
         const li = document.createElement('li');
         li.classList.add("student-item");
         li.classList.add("cf");

         const div = document.createElement('div');
         div.className = "student-details";

         const img = document.createElement('img');
         img.className = "avatar";
         img.src = `${list[i].picture.large}`;
         img.alt = "Profile Picture";
         div.appendChild(img);

         const h3 = document.createElement('h3');
         h3.textContent = `${list[i].name.first} ${list[i].name.last}`;
         div.appendChild(h3);

         const span = document.createElement('span');
         span.className = "email"
         span.textContent = `${list[i].email}`;
         div.appendChild(span);
         li.appendChild(div);

         const div2 = document.createElement('div');
         div2.className = "joined-details";

         const span2 = document.createElement('span');
         span2.className = "date";
         span2.textContent =  `Joined ${list[i].registered.date.replace(/\-/g,"/")}`;
         div2.appendChild(span2);
         li.appendChild(div2);

         studentList.appendChild(li); 
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
This section uses button elements and event listener to switch between relevent pages. 
*/
function addPagination(list) {
   const numberOfPages = list.length / 9;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for ( let i = 0; i < numberOfPages; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';

      button.textContent = `${i+1}`;

      li.appendChild(button);
      linkList.appendChild(li);
   }
   linkList.firstChild.firstChild.className = 'active';
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         for (const li of linkList.childNodes) {
            const button = li.firstChild;
            if (button.className === 'active') {
               button.classList.remove("active");
            }
         } 
         
         e.target.className = 'active';
         const pageNumberClicked = e.target.textContent;
         showPage(list, pageNumberClicked);
      }
   })
}
// Call functions
showPage(data, 1);
addPagination(data);