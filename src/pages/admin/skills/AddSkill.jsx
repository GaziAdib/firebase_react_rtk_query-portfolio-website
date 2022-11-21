import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Error from '../../../components/ui/Error';
import { useAddSkillMutation } from '../../../features/skills/skillsApi'



const AddSkill = () => {

    const [addSkill, { isLoading, isError, error }] = useAddSkillMutation();

    const [skillName, setSkillName] = useState('')
    const [skillScore, setSkillScore] = useState(0)

    const navigate = useNavigate();

    const formSubmitHandler = (e) => {

        e.preventDefault()

        // add skill to firebase

        if (skillName !== '' && skillScore !== 0) {
            addSkill({
                skillName,
                skillScore
            });
        }
        setSkillName('')
        setSkillScore(0)

        navigate('/dashboard');

    }

    return (
        <>
            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add  <b className='text-green-600'>Skills</b> To Your Liking ❤️
                </div>
                <hr />
                <br />

                <form onSubmit={formSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">


                        <div className="col-span-2 lg:col-span-2">
                            <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Skill Name (React, Redux, Vue etc)" />
                        </div>

                        <div className="col-span-2">
                            <input type="number" value={skillScore} onChange={(e) => setSkillScore(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Skill Score (50, 60 etc)" />
                        </div>

                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-4 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add Skill
                            </button>
                        </div>

                    </div>
                </form>
                <div className="flex items-center justify-between">
                    {!isLoading && error && <Error message={error} />}
                </div>
            </div>


        </>
    )
}

export default AddSkill
