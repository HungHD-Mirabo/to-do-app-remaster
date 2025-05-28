export class DataUtilities {
  DataFake = [
    { title: "Learn React", completed: false },
    { title: "Do laundry", completed: true },
    { title: "Buy groceries", completed: false },
    { title: "Finish TypeScript lesson", completed: true },
    { title: "Call mom", completed: false },
    { title: "Write blog post", completed: true },
    { title: "Walk the dog", completed: false },
    { title: "Clean the house", completed: true },
    { title: "Fix the bike", completed: false },
    { title: "Study math", completed: true },
    { title: "Pay electricity bill", completed: false },
    { title: "Water the plants", completed: true },
    { title: "Read a book", completed: false },
    { title: "Reply to emails", completed: true },
    { title: "Update resume", completed: false },
    { title: "Plan weekend trip", completed: true },
    { title: "Backup computer", completed: false },
    { title: "Attend team meeting", completed: true },
    { title: "Practice guitar", completed: false },
    { title: "Meditate", completed: true },
    { title: "Learn React", completed: false },
    { title: "Do laundry", completed: true },
    { title: "Buy groceries", completed: false },
    { title: "Finish TypeScript lesson", completed: true },
    { title: "Call mom", completed: false },
    { title: "Write blog post", completed: true },
    { title: "Walk the dog", completed: false },
    { title: "Clean the house", completed: true },
    { title: "Fix the bike", completed: false },
    { title: "Study math", completed: true },
    { title: "Pay electricity bill", completed: false },
    { title: "Water the plants", completed: true },
    { title: "Read a book", completed: false },
    { title: "Reply to emails", completed: true },
    { title: "Update resume", completed: false },
    { title: "Plan weekend trip", completed: true },
    { title: "Backup computer", completed: false },
    { title: "Attend team meeting", completed: true },
    { title: "Practice guitar", completed: false },
    { title: "Meditate", completed: true },
  ];

  getData(filter: string) {
    return this.DataFake;
  }

  getItem(page: number = 1, filter: string = "all") {
    console.log("getItem");
    const currentItem = page * 5;
    return this.DataFake.slice(currentItem, currentItem + 5);
  }
}
