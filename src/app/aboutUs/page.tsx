"use client"

const page = () => {
  return (
    <div className="max-container padding-container bg-gray-100 text-gray-800 mb-11">
        <div className="container mx-auto p-6">
        {/* <!-- Title Section --> */}
            <section className="text-center mb-8">
                <h1 className="text-4xl font-bold text-green-700 mb-4">About Us</h1>
                <p className="text-lg text-gray-600">Welcome to CampNew! Rediscover nature, adventure, and community with us.</p>
            </section>

        {/* <!-- Mission Section --> */}
            <section className="mb-8">
                <h2 className="text-3xl font-semibold text-green-600 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                    Our mission is simple yet powerful: to provide a serene and inspiring space where people can unwind, grow, and build lifelong memories. From cozy cabins to adventurous hiking trails, CampNew is all about rediscovering the beauty of nature while enjoying comfort and camaraderie.
                </p>
            </section>

        {/* <!-- Story Section --> */}
            <section className="mb-8">
                <h2 className="text-3xl font-semibold text-green-600 mb-4">Our Story</h2>
                <p className="text-gray-700 leading-relaxed">
                    CampNew was founded on the vision of bringing people closer to nature without sacrificing the warmth of home. What began as a small retreat has grown into a destination for those who seek more than just a getaway—it's a place to rejuvenate, reset, and reconnect.
                </p>
            </section>

        {/* <!-- Why Choose Us Section --> */}
            <section className="mb-8">
                <h2 className="text-3xl font-semibold text-green-600 mb-4">Why Choose CampNew?</h2>
                <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                    <li><strong>Exceptional Service</strong>: Our dedicated staff is here to make every moment of your stay memorable.</li>
                    <li><strong>Scenic Locations</strong>: Each CampNew location is carefully chosen to offer the best views and access to nature.</li>
                    <li><strong>Comfort Meets Adventure</strong>: Enjoy a variety of activities while resting in our well-equipped lodges.</li>
                </ul>
            </section>

        {/* <!-- Closing Section --> */}
            <section className="text-center mt-8">
                <p className="text-lg text-gray-600">Come join us and experience the beauty of CampNew. We look forward to being part of your next adventure!</p>
            </section>
        </div>
    </div>
  )
}

export default page
