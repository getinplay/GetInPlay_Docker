import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ContactUsForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  const maxMessageLength = 250;

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Allowed: letters, numbers, whitespace, and only these special characters: . , ? '
    const messageRegex = /^[a-zA-Z0-9\s.,?']*$/;

    let errors = {};

    if (!name) errors.name = "Name is required!";
    if (!phone) errors.phone = "Phone no. is required!";
    else if (!phoneRegex.test(phone)) errors.phone = "Enter a valid phone no.!";
    if (!email) errors.email = "Email is required!";
    else if (!emailRegex.test(email))
      errors.email = "Enter a valid email address!";
    if (!message) errors.message = "Message is required!";
    else if (!messageRegex.test(message))
      errors.message =
        "Message can only contain letters, numbers, spaces, and .,?'";
    else if (message.length > maxMessageLength)
      errors.message = `Message cannot exceed ${maxMessageLength} characters!`;

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendEmail = async (data) => {
    setIsSending(true);
    return toast
      .promise(
        axios.post(`${import.meta.env.VITE_API_URL}/Api/contact.php`, data, {
          headers: { "Content-Type": "application/json" },
        }),
        {
          pending: "Sending Email...",
          success: "Email Sent Successfully!",
          error: "Error sending email. Please try again.",
        },
        {
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          autoClose: 3000,
        }
      )
      .then((res) => {
        setIsSending(false);
        return res.data;
      })
      .catch(() => {
        setIsSending(false);
        return { success: false, message: "Error sending email." };
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { name, phone, email, message };
    await sendEmail(data);
  }

  return (
    <div className='flex grow lg:w-[800px] font-semibold'>
      <form
        noValidate
        id='contact-us-form'
        className='flex flex-col grow h-max shadow-[0_2px_16px_rgba(0,0,0,0.4)] rounded-lg p-5 justify-center items-end overflow-auto sm:text-xl text-lg'
        onSubmit={handleSubmit}>
        <div className='flex sm:gap-5 flex-col sm:flex-row max-sm:w-full'>
          <div className='flex max-sm:flex-col sm:gap-3 w-full justify-between'>
            <label
              htmlFor='name'
              className='required text-gray-700 min-w-25 text-start'>
              Name:
            </label>
            <div className='flex flex-col text-start w-full'>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                id='name'
                name='name'
                placeholder='John Doe'
                className='bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'
              />
              <p className='select-none text-red-500 text-sm px-2 font-medium'>
                {errors.name || " "}
              </p>
            </div>
          </div>
          <div className='flex max-sm:flex-col sm:gap-3 w-full justify-between '>
            <label
              htmlFor='phone'
              className='required text-gray-700 min-w-20 text-start'>
              Phone:
            </label>
            <div className='flex flex-col text-start w-full'>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type='tel'
                id='phone'
                name='phone'
                placeholder='+91 9123456789'
                className='bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'
              />
              <p className='select-none text-red-500 text-sm px-2 font-medium'>
                {errors.phone || " "}
              </p>
            </div>
          </div>
        </div>
        <div className='flex max-sm:flex-col sm:gap-3 w-full justify-between'>
          <label
            htmlFor='email'
            className='required text-gray-700 min-w-25 text-start'>
            Email:
          </label>
          <div className='flex flex-col text-start w-full'>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
              className='bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'
            />
            <p className='select-none text-red-500 text-sm px-2 font-medium'>
              {errors.email || " "}
            </p>
          </div>
        </div>
        <div className='flex max-sm:flex-col sm:gap-3 w-full justify-between '>
          <label
            htmlFor='message'
            className='required text-gray-700 min-w-25 text-start'>
            Message:
          </label>
          <div className='flex flex-col text-start w-full'>
            <textarea
              required
              value={message}
              onChange={(e) => {
                const newMessage = e.target.value;
                // Only update if within max length and allowed characters only
                if (
                  newMessage.length <= maxMessageLength &&
                  /^[a-zA-Z0-9\s.,?']*$/.test(newMessage)
                ) {
                  setMessage(newMessage);
                }
              }}
              rows={3}
              id='message'
              name='message'
              placeholder='Enter your Message'
              className='resize-none bg-gray-200 w-full font-medium text-gray-600 border-none outline-none rounded-lg px-3 py-1'
            />
            <p className='text-gray-400 text-sm px-2 font-medium'>
              {message.length}/{maxMessageLength}
            </p>
            <p className='select-none text-red-500 text-sm px-2 font-medium'>
              {errors.message || " "}
            </p>
          </div>
        </div>
        <div className='flex max-sm:flex-col w-full justify-end items-center py-2'>
          <button
            type='submit'
            disabled={isSending}
            className={`${
              isSending
                ? "bg-gray-500 text-gray-200 translate-y-2"
                : "bg-[#4A5BE6] text-white hover:shadow-xl shadow-lg cursor-pointer active:translate-y-2 active:shadow-none"
            } font-normal sm:text-lg w-[160px] p-1 rounded-lg tracking-wide shadow-gray-400 duration-300`}>
            {isSending ? "SENDING . . ." : "SEND MESSAGE"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUsForm;
