import { RepoProps } from "../types/Repo";

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import BackBtn from "../components/BackBtn/BackBtn";
import Loader from "../components/Loader/Loader";
import Repo from "../components/Repo/Repo";

import styles from './repos.module.css'

const Repos = () => {
  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const { username } = useParams();

  useEffect(() => {
    const loadRepos = async (username: string) => {
      setIsLoading(true)

      const res = await fetch(`https://api.github.com/users/${username}/repos`)

      const data = await res.json()

      setRepos(data)
      setIsLoading(false)
    }

    if (username) {
      loadRepos(username);
    }
  }, [])

  return (
    <div className={styles.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuário: {username}</h2>
      {repos && repos.length === 0 && <p>Não há repositórios.</p>}
      {isLoading ? <Loader /> : null}
      {repos && repos.length > 0 && (
        <div className={styles.repos_container}>
          {repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Repos