import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const ContactForm = () =>
{
  const [status, setStatus] = useState('')
  const [recaptcha, setRecaptcha] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) =>
  {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message || !recaptcha)
    {
      setStatus('Please fill out all fields and complete the reCAPTCHA verification.')
      return
    }

    setIsSubmitting(true)
    setStatus('')

    try
    {
      // Create form data for Formspree
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('_captcha', 'false') // Disable Formspree's built-in captcha
      formDataToSend.append('g-recaptcha-response', recaptcha) // Send reCAPTCHA token

      const response = await fetch('https://formspree.io/f/manbdyon', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok)
      {
        setStatus('Thanks! Your message has been sent successfully.')
        setFormData({ name: '', email: '', message: '' })
        setRecaptcha(null)
        // Reset reCAPTCHA
        if (window.grecaptcha)
        {
          window.grecaptcha.reset()
        }
      } else
      {
        const errorData = await response.json()
        setStatus(`Error: ${errorData.error || 'Something went wrong. Please try again.'}`)
      }
    } catch (error)
    {
      setStatus('Network error. Please check your connection and try again.')
    } finally
    {
      setIsSubmitting(false)
    }
  }

  const handleRecaptchaChange = (value) =>
  {
    setRecaptcha(value)
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us about your project..."
            rows="5"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          ></textarea>
        </div>

        {/* reCAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LfAgpgrAAAAAImSVXUvjVRLg20NHq7Y5M2JXk8v"
            onChange={handleRecaptchaChange}
            theme="light"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 rounded-md font-semibold transition-colors duration-200 focus:ring-2 focus:ring-brand focus:ring-offset-2 ${isSubmitting
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-brand text-white hover:bg-brand/90'
            }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {status && (
          <div className={`text-sm p-3 rounded-md ${status.includes('Thanks')
            ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
            : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
            }`}>
            {status}
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactForm
