<script>
  let { skill } = $props();
</script>

<div class="skill-icon">
  <img src={skill.svg} alt={skill.name} />
  <span>{skill.name}</span>
</div>

<style>
  .skill-icon {
    width: 96px;
    height: 96px;
    padding: 10px;
    border-radius: 1rem;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    background: #252423;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 72px;
      height: 72px;
    }

    span {
      color: #ffffff;
      font-weight: 600;
      font-size: 0.8rem;
      line-height: 0.9;
      text-align: center;

      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  @media only screen and (max-width: 768px) {
    .skill-icon {
      width: calc(100% / 3 - 20px);
      height: 72px;

      img {
        width: 48px;
        height: 48px;
      }
    }
  }
</style>