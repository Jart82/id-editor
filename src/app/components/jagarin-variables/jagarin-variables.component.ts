import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jagarin-variables',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jagarin-variables.component.html',
  styleUrl: './jagarin-variables.component.scss'
})
export class JagarinVariablesComponent {

  firstName : string = 'Jeremiah'; 


  currentDate : Date = new Date();

   
  inputType: string = "checkbox";

  classInput: string = 'form-check-input';

  name : string = '';

  companyName: string = '';

  position = '';

  dateEmployed = this.currentDate;

  experience : string = "";


  img: string = "https://images.pexels.com/photos/6706847/pexels-photo-6706847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";  
  newImage: File | null = null; // To hold the newly selected file  

  onFileSelected(event: Event): void {  
    const input = event.target as HTMLInputElement;  
    if (input.files && input.files.length > 0) {  
      this.newImage = input.files[0]; // Get the first selected file  

      
      // Create a local URL for the image file to display it  
      const reader = new FileReader();  
      reader.onload = (e) => {  
        this.img = e.target?.result as string; // Update the img property to the new image's URL  
      };  
      reader.readAsDataURL(this.newImage); // Read the file as a data URL  
    }  
  }  

  


  showCardAlert () {
    alert('Card successfully created');
  }

}
