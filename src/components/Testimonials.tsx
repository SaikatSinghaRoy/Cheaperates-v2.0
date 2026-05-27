import AnimateOnScroll from './AnimateOnScroll';

const testimonial = [
    {
        name: "Aman Verma",
        details: "Tech Enthusiast",
        description: "Cheaperates saves me so much time! The AI summary is incredibly accurate, and the price comparison helped me find a cheaper alternative.",
    },
    {
        name: "Sarah Lim",
        details: "Online Shopper",
        description: "This website is a game changer. Having instant price comparisons and summarized insights right on the product page is incredible!"
    },
    {
        name: "",
        details: "",
        description: ""
    },
    
];


type CardProps = { name: string, description: string, about: string, t: number }
function TestimonialCard({ name, description, about, t }: CardProps) {
    return (
        <AnimateOnScroll delay={t}>
            <div className='w-full h-full max-sm:max-w-[300px] mx-auto p-6 md:p-8 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 hover:border-[#607AFB]/50 shadow-xl hover:shadow-[#607AFB20] transition-all flex flex-col gap-6 justify-between'>
                <p className="text-gray-300 max-md:text-xs text-[14px]">
                    {description}
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#607AFB] to-[#4D68E8]"></div>
                    <div>
                        <h5 className="font-semibold text-white max-md:text-[14px]">{name}</h5>
                        <p className="text-[10px] md:text-xs text-gray-400">{about}</p>
                    </div>
                </div>
            </div>
        </AnimateOnScroll>
    );
}

export default function Testimonials() {
    return (
        <section className="relative py-12 md:py-18 transition-all overflow-hidden">

            {/* Top gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark) via-transparent to-transparent "></div>

            <div className="absolute top-0 left-0 w-[60%] h-[30%] bg-(--primary)/20 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[60%] h-[30%] bg-(--primary)/40 blur-[150px] rounded-full"></div>

            <div className="container mx-auto px-6 relative">
                {/* Heading */}
                <p className="text-center mb-2 md:mb-4">
                    <span className="bg-(--primary)/10 text-(--primary) text-[9px] md:text-xs font-bold px-3 py-1 rounded-full">TESTIMONIALS</span>
                </p>

                <AnimateOnScroll>
                    <h3 className="text-2xl md:text-4xl font-bold text-center text-white mb-6 mx-auto">What Smart Shoppers tells</h3>
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.15}>
                    <p className="text-center text-gray-400 max-md:max-w-[350px] max-w-xl max-lg:text-[12px] mx-auto mb-16">
                        Here's what our users say after using Cheaperates to get the best deals and
                        save time while shopping online.
                    </p>
                </AnimateOnScroll>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-10">

                    {/* Testimonial 1 */}
                    <TestimonialCard t={0} description="Cheaperates saves me so much time! The AI summary is incredibly accurate, and the price comparison helped me find a cheaper alternative." name="Aman Verma" about="Tech Enthusiast" />

                    {/* Testimonial 2 */}
                    <TestimonialCard t={0.15} description="This website is a game changer. Having instant price comparisons and summarized insights right on the product page is incredible!" name="Sarah Lim" about="Online Shopper" />

                    {/* Testimonial 3 */}

                    <TestimonialCard t={0.3} description="I've been using this for all my Amazon purchases. The AI insights are on point and the money saved is absolutely worth it." name="Rohit Sharma" about="Frequent Buyer" />


                </div>
            </div>
        </section>
    );
}
