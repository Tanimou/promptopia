import PromptCard from "@components/PromptCard"
const CreatorProfilePage = ({name,desc,data }) => {


    return (
        <section className="w-full">
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{name} Profile</span>
            </h1>
            <p className="desc text-left">{desc}</p>
            <div className="prompt_layout mt-10">
                {data.map((prompt) => (
                    <PromptCard
                        key={prompt._id}
                        prompt={prompt}
                        
                    />
                ))}
            </div>
        </section>
    );
};

export default CreatorProfilePage;