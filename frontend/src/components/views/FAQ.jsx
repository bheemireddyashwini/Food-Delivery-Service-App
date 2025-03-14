import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useRef } from "react";
import TawkToChat from "../TawkChat";

import {
	FaChevronUp,
	FaChevronDown,
	FaArrowUp,
	FaThumbsUp,
	FaThumbsDown,
	FaComments,
	FaPhone,
	FaEnvelope,
} from "react-icons/fa";
import faqData from "../../utils/FaqData";

const FAQ = () => {
	const [activeCategory, setActiveCategory] = useState("Ordering Process");
	const [expandedQuestions, setExpandedQuestions] = useState({});
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleQuestion = (categoryIndex, questionIndex) => {
		const key = `${categoryIndex}-${questionIndex}`;
		setExpandedQuestions((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleFeedback = (categoryIndex, questionIndex, helpful) => {
		// Implement feedback logic here
		console.log(
			`Feedback recorded: ${helpful ? "Helpful" : "Not helpful"}`
		);
	};
	const handleToggleChat = () => {
		if (window.Tawk_API) {
			window.Tawk_API.toggle(); // This toggles the chat widget visibility
		}
	};

	return (
		<div className="flex flex-col min-h-screen justify-center max-w-4xl mx-auto px-4 py-8 text-white">
			<TawkToChat /> {/* <-- TawkToChat component is rendered here */}
			{/* Breadcrumb Navigation */}
			<nav
				aria-label="Breadcrumb"
				className="text-sm mb-6">
				<ol className="flex">
					<li>
						<Link
							to="/"
							className="text-[#F97316] hover:underline focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded px-1">
							Home
						</Link>
					</li>
					<li
						className="mx-2"
						aria-hidden="true">
						/
					</li>
					<li
						aria-current="page"
						className="text-[#F97316] font-semibold">
						FAQ
					</li>
				</ol>
			</nav>
			<main>
				<h1
					className="text-3xl font-bold mb-8"
					id="faq-heading">
					Frequently Asked Questions
				</h1>

				{/* Category Tabs */}
				<div
					role="tablist"
					aria-label="FAQ Categories"
					className="flex flex-wrap gap-2 mb-8">
					{Object.keys(faqData).map((category) => (
						<button
							key={category}
							role="tab"
							aria-selected={activeCategory === category}
							aria-controls={`${category}-panel`}
							id={`${category}-tab`}
							className={`px-4 py-2 rounded-full ${
								activeCategory === category
									? "bg-[#F97316] text-white font-semibold border-white border"
									: "bg-gray-100 bg-opacity-25 text-white"
							} focus:outline-none focus:ring-2 focus:ring-[#F97316]`}
							onClick={() => setActiveCategory(category)}>
							{category}
						</button>
					))}
				</div>

				{/* FAQ Accordion */}
				<div
					role="tabpanel"
					id={`${activeCategory}-panel`}
					aria-labelledby={`${activeCategory}-tab`}
					className="space-y-6">
					{faqData[activeCategory].map((item, questionIndex) => {
						const isExpanded =
							expandedQuestions[
								`${activeCategory}-${questionIndex}`
							];
						const questionId = `question-${activeCategory}-${questionIndex}`;
						const answerId = `answer-${activeCategory}-${questionIndex}`;

						return (
							<div
								key={questionIndex}
								className="border rounded-lg overflow-hidden">
								<h2>
									<button
										id={questionId}
										aria-expanded={isExpanded}
										aria-controls={answerId}
										className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-lighter focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-inset"
										onClick={() =>
											toggleQuestion(
												activeCategory,
												questionIndex
											)
										}>
										<span className="font-medium">
											{item.question}
										</span>
										{isExpanded ? (
											<FaChevronUp
												className="text-[#F97316]"
												aria-hidden="true"
											/>
										) : (
											<FaChevronDown
												className="text-[#F97316]"
												aria-hidden="true"
											/>
										)}
									</button>
								</h2>

								{isExpanded && (
									<div
										id={answerId}
										role="region"
										aria-labelledby={questionId}
										className="px-6 py-4 bg-gray-50">
										<p className="text-gray-700 mb-4">
											{item.answer}
										</p>

										{/* Feedback Buttons */}
										<div className="flex items-center gap-4 mt-4">
											<span className="text-sm text-gray-600">
												Was this helpful?
											</span>
											<button
												onClick={() =>
													handleFeedback(
														activeCategory,
														questionIndex,
														true
													)
												}
												className="flex items-center gap-2 text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 rounded px-2 py-1"
												aria-label="Mark answer as helpful">
												<FaThumbsUp aria-hidden="true" />{" "}
												Yes
											</button>
											<button
												onClick={() =>
													handleFeedback(
														activeCategory,
														questionIndex,
														false
													)
												}
												className="flex items-center gap-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-2 py-1"
												aria-label="Mark answer as not helpful">
												<FaThumbsDown aria-hidden="true" />{" "}
												No
											</button>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</main>
			{/* Support Options */}
			<section
				aria-labelledby="support-heading"
				className="flex flex-col justify-center mt-12 bg-transparent p-6 rounded-lg">
				<h2
					id="support-heading"
					className="text-xl font-semibold text-center mb-4">
					Need More Help?
				</h2>
				<div className="flex flex-row justify-between md:grid md:grid-cols-3 gap-4">
					<button
						onClick={handleToggleChat}
						className="flex flex-col items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded px-2 py-1"
						aria-label="Open live chat support">
						<FaComments
							className="text-[#F97316]"
							aria-hidden="true"
						/>
						Open Live Chat
					</button>

					<a
						href="mailto:support@fooddelivery.com"
						className="flex flex-col items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded px-2 py-1"
						aria-label="Email customer support">
						<FaEnvelope
							className="text-[#F97316]"
							aria-hidden="true"
						/>
						Email Support
					</a>
					<a
						href="tel:1-800-FOOD-DEL"
						className="flex flex-col items-center gap-2 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded px-2 py-1"
						aria-label="Call customer support">
						<FaPhone
							className="text-[#F97316]"
							aria-hidden="true"
						/>
						Call Us
					</a>
				</div>
			</section>
			{/* Back to Top Button */}
			{showBackToTop && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
					aria-label="Back to top">
					<FaArrowUp aria-hidden="true" />
				</button>
			)}
		</div>
	);
};

export default FAQ;
