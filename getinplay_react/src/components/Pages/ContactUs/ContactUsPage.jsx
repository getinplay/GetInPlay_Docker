import ContactUsForm from "../Home/ContactUsForm";

function ContactUsPage() {
  return (
    <div className='flex flex-col justify-between items-center sm:gap-3 p-5 w-full font-semibold'>
      <h1 className='sm:text-5xl text-4xl p-3 font-bold text-gray-700'>
        Contact Us
      </h1>
      <ContactUsForm />
    </div>
  );
}

export default ContactUsPage;
