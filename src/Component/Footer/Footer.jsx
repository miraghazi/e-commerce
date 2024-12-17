import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import amazon from '../../assets/images/amazon-pay.png'
import appGoogle from '../../assets/images/get-google-play.png'

export default function Footer() {
  return <>
 <footer className='py-4 '>
    <div className="container mx-auto  mt-10 px-1">
        <h2 className="text-3xl font-bold text-gray-800">Get Fresh cart App</h2>
        <p className="opacity-65 text-gray-600 text-lg mb-5">we will send to you download link , open it and download App</p>
        <div className="flex gap-5">
        <input type="text" name="text" id="text"
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="Enter App Link " />
        <button className=" rounded-md bg-green-500 text-white">Share App Link</button>
        </div>

        <div className='mt-5 flex justify-between sm:px-0 px-5'>
            <div className='flex flex-col sm:flex-row gap-3 items-center flex-wrap'>
                <span className='font-semibold text-gray-700'>Payment Methods :</span>
                <img src={mastercard} className='w-16' alt="" />
                <img src={paypal} className='w-16' alt="" />
                <img src={amazon}  className='w-16'alt="" />
            </div>
            <div className='flex flex-col sm:flex-row gap-3 items-center'>
                <span className='font-semibold text-gray-700'>Get App Now On</span>
                <img src={appGoogle} className='w-20 object-contain' alt="" />
            </div>
        </div>
    </div>
</footer>
  </>
}
